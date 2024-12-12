package com.planetwise.transit.service;

import com.planetwise.transit.Caluculation.CarbonEmissionCalculation;
import com.planetwise.transit.dto.TransportDto;
import com.planetwise.transit.dto.TrendsDto;
import com.planetwise.transit.exception.DataNotFoundException;
import com.planetwise.transit.exception.UsernameNotFoundException;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.repository.TransportationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransportationLogServiceImpl implements TransportationLogService {

    @Autowired
    private TransportationLogRepository transportRepo;

    @Autowired
    private CarbonEmissionCalculation logic;

    @Override
    public TransportationLog addTransportationUsage(String username, TransportationLog transportationLog) {
        double emissions = logic.calculateEmissions(transportationLog);
        transportationLog.setCarbon_emissions(emissions);
        transportationLog.setUsername(username);
        return transportRepo.save(transportationLog);
    }

    @Override
    public List<TrendsDto> getTrendsForTransportation(String username) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(12); // Adjust to last 10 months

        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();

        List<Object[]> transportationLogs =
                transportRepo.findMonthlyCarbonEmissionsByUsernameAndDateRange(username, Year.of(startYear), startMonth);

        if (transportationLogs.isEmpty()) {
            throw new DataNotFoundException("No transportation data found for user: " + username);
        }

        return transportationLogs.stream()
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
        if (transportRepo.existsByUsername(username)) {

            return transportRepo
                    .findByUsernameAndMonthAndYear(username, year, month)
                    .stream()
                    .mapToDouble(TransportationLog::getCarbon_emissions)
                    .sum();
        } else {
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }
    }

    @Override
    public Double getLatestCarbonEmissions(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null.");
        }

        if (!transportRepo.existsByUsername(username)) {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }

        return transportRepo.getLatestData(username).stream()
                .mapToDouble(wp -> Optional.ofNullable(wp.getCarbon_emissions()).orElse(0.0))
                .sum();
    }

    @Override
    public List<TransportDto> getAll(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null.");
        }

        if (!transportRepo.existsByUsername(username)) {
            throw new UsernameNotFoundException("User with username " + username + " not found.");
        }
        List<TransportationLog> logs= transportRepo.getAllSorted(username);

        return logs.stream().map(i -> new TransportDto(
                i.getMonth(),
                i.getYear(),
                i.getTransportation_mode(),
                i.getFuel_type(),
                i.getDistance_km(),
                i.getCarbon_emissions()
                )).toList();
    }


}
