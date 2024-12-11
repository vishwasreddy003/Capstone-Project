package com.planetwise.transit.service;

import com.planetwise.transit.Caluculation.CarbonEmissionCalculation;
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
        LocalDate startDate = now.minusMonths(10); // Adjust to last 10 months

        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();

        // Fetch transportation logs for the last 10 months
        List<Object[]> transportationLogs =
                transportRepo.findMonthlyCarbonEmissionsByUsernameAndDateRange(username, Year.of(startYear), startMonth);

        if (transportationLogs.isEmpty()) {
            throw new DataNotFoundException("No transportation data found for user: " + username);
        }

        // Map the query result to TrendsDto objects
        return transportationLogs.stream()
                .map(log -> {
                    Year year = (Year) log[0];
                    Month month = (Month) log[1];
                    double carbonEmissions = (double) log[2];

                    return new TrendsDto(month, year, carbonEmissions);
                })
                .collect(Collectors.toList());
    }


    @Override
    public Double getCarbonEmissions(String username, Year year, Month month) {
        if (transportRepo.existsByUsername(username)) {

            return transportRepo
                    .findByUsernameAndMonthAndYear(username, year.getValue(), month)
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
                .average()
                .orElse(0.0);
    }
}
