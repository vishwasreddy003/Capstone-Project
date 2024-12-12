package com.planetwise.waste.service;

import com.planetwise.waste.calculation.CarbonEmissionCalculation;
import com.planetwise.waste.dto.TrendsDto;
import com.planetwise.waste.dto.WasteDto;
import com.planetwise.waste.exception.DataAlreadyExistsException;
import com.planetwise.waste.exception.UsernameNotFoundException;
import com.planetwise.waste.model.WasteProduction;
import com.planetwise.waste.repository.WasteProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WasteProductionServiceImpl implements WasteProductionService {

    @Autowired
    private WasteProductionRepository wasteProductionRepo;

    @Autowired
    private CarbonEmissionCalculation logic;

    @Override
    public WasteProduction saveWasteProduction(String username, WasteProduction wasteProduction) {
        if (username == null || wasteProduction == null) {
            throw new IllegalArgumentException("Username or waste production data cannot be null.");
        }

        if (!wasteProductionRepo.existsByUsernameWastetypeAndMonth(
                username, wasteProduction.getWaste_type(), wasteProduction.getMonth(), wasteProduction.getYear())) {
            double emissions = logic.calculateCarbonEmissions(wasteProduction.getQuantity_kgs(), wasteProduction.getWaste_type());
            wasteProduction.setCarbon_emissions(emissions);
            return wasteProductionRepo.save(wasteProduction);
        } else {
            throw new DataAlreadyExistsException("Data already exists for this month, year, and waste type.");
        }
    }

    @Override
    public List<TrendsDto> getTrendsForWasteProduction(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null.");
        }

        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(12);

        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();

        List<Object[]> rawResults = Optional.ofNullable(
                wasteProductionRepo.findWasteProductionFromLastTenMonths(username, Year.of(startYear), startMonth)
        ).orElseThrow(() -> new UsernameNotFoundException("No data found for username: " + username));

        return rawResults.stream()
                .map(result -> {
                    int year = (int) result[0];
                    String monthString = (String) result[1];
                    double carbonEmissions = ((Number) result[2]).doubleValue();

                    Year trendYear = Year.of(year);
                    Month trendMonth = Month.valueOf(monthString.toUpperCase());

                    return new TrendsDto(trendMonth, trendYear, carbonEmissions);
                })
                .collect(Collectors.toList());
    }


    @Override
    public Double getCarbonEmissions(String username, Year year, Month month) {
        if (username == null || year == null || month == null) {
            throw new IllegalArgumentException("Username, year, or month cannot be null.");
        }

        if (wasteProductionRepo.existsByUsername(username)) {
            return wasteProductionRepo.findByUsernameAndYearAndMonth(username, year, month).stream()
                    .mapToDouble(i -> Optional.ofNullable(i.getCarbon_emissions()).orElse(0.0))
                    .average()
                    .orElse(0.0);
        } else {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }
    }

    @Override
    public Double getLatestCarbonEmissions(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null.");
        }

        if (!wasteProductionRepo.existsByUsername(username)) {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }

        return wasteProductionRepo.getLatestData(username).stream()
                .mapToDouble(wp -> Optional.ofNullable(wp.getCarbon_emissions()).orElse(0.0))
                .sum();
    }

    @Override
    public List<WasteDto> getAll(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null.");
        }

        if (!wasteProductionRepo.existsByUsername(username)) {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }
        List<WasteProduction> wasteProductions = wasteProductionRepo.getAllSorted(username);

        return wasteProductions.stream()
                .map(wasteProduction -> new WasteDto(
                        wasteProduction.getMonth(),
                        wasteProduction.getYear(),
                        wasteProduction.getWaste_type(),
                        wasteProduction.getQuantity_kgs(),
                        wasteProduction.getCarbon_emissions()
                ))
                .toList();
    }



}
