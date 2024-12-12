package com.planetwise.energywise.service;

import com.planetwise.energywise.calculation.CarbonEmissionCalculation;
import com.planetwise.energywise.dto.EnergyDto;
import com.planetwise.energywise.dto.TrendsDto;
import com.planetwise.energywise.exception.DataAlreadyExistsException;
import com.planetwise.energywise.exception.DataNotFoundException;
import com.planetwise.energywise.exception.UsernameNotFoundException;
import com.planetwise.energywise.model.EnergyConsumption;
import com.planetwise.energywise.repository.EnergyConsumptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EnergyConsumptionServiceImpl implements EnergyConsumptionService {

    @Autowired
    private EnergyConsumptionRepository energyRepo;

    @Autowired
    private CarbonEmissionCalculation logic;

    @Override
    public EnergyConsumption saveEnergyConsumption(String username, EnergyConsumption energyConsumption) {


        if (!energyRepo.existsByUsernameAndMonthAndYear(username, energyConsumption.getMonth(), energyConsumption.getYear())) {

            double emissions = logic.Calculate(energyConsumption.getElectricity_units(), energyConsumption.getNo_of_gas_cylinders());
            energyConsumption.setCarbon_emissions(emissions);
            energyConsumption.setUsername(username);

            return energyRepo.save(energyConsumption);
        } else {
            throw new DataAlreadyExistsException("This Month and Year Data already exists for the user.");
        }
    }


    @Override
    public List<TrendsDto> getUserTrendsForEnergyConsumption(String username) {

        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(12); // Adjust to last 10 months

        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();

        // Fetch transportation logs for the last 10 months
        List<Object[]> energyLogs =
                energyRepo.findEnergyConsumptionOfLast10Months(username, Year.of(startYear), startMonth);

        if (energyLogs.isEmpty()) {
            throw new DataNotFoundException("No transportation data found for user: " + username);
        }

        // Map the query result to TrendsDto objects
        return energyLogs.stream()
                .map(result -> {
                    int year = (int) result[0];
                    String monthString = (String) result[1];
                    double carbonEmissions = ((Number) result[2]).doubleValue();

                    // Convert SQL result to TrendsDto
                    Year trendYear = Year.of(year);
                    Month trendMonth = Month.valueOf(monthString.toUpperCase());

                    return new TrendsDto(trendMonth, trendYear, carbonEmissions);
                })
                .collect(Collectors.toList());
    }

    @Override
    public Double getCarbonEmissions(String username, Year year, Month month) {
        if(energyRepo.existsByUsername(username)){
            return energyRepo.findByUsernameAndMonthAndYear(username,year,month).stream().mapToDouble(EnergyConsumption::getCarbon_emissions).average().getAsDouble();
        }else {
            throw new UsernameNotFoundException(("User with username " + username +" not found"));
        }
    }

    @Override
    public Double getLatestCarbonEmissions(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null.");
        }

        if (!energyRepo.existsByUsername(username)) {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }

        return energyRepo.getLatestData(username).stream()
                .mapToDouble(wp -> Optional.ofNullable(wp.getCarbon_emissions()).orElse(0.0))
                .sum();
    }

    @Override
    public List<EnergyDto> getAll(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null.");
        }

        if (!energyRepo.existsByUsername(username)) {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }

        List<EnergyConsumption> logs = energyRepo.getAllSorted(username);

        return logs.stream().map(i -> new EnergyDto(
                i.getMonth(),
                i.getYear(),
                i.getElectricity_units(),
                i.getNo_of_gas_cylinders(),
                i.getCarbon_emissions()
        )).toList();
    }
}
