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
        LocalDate startDate = now.minusMonths(12);

        Month startMonth = startDate.getMonth();
        int startYear = startDate.getYear();

        // Fetch transportation logs for the last 12 months
        List<TransportationLog> transportationLogs =
                transportRepo.findByUsernameAndMonthAndYear(username, startYear, startMonth);

        if (transportationLogs.isEmpty()) {
            throw new DataNotFoundException("No transportation data found for user: " + username);
        }

        // Group by Year and Month, and sum up carbon emissions
        Map<String, Double> aggregatedData = transportationLogs.stream()
                .collect(Collectors.groupingBy(
                        log -> log.getYear() + "-" + log.getMonth(),
                        Collectors.summingDouble(TransportationLog::getCarbon_emissions)
                ));

        // Convert the aggregated data to TrendsDto with Month and Year types
        return aggregatedData.entrySet().stream()
                .map(entry -> {
                    String[] yearMonth = entry.getKey().split("-");
                    Year year = Year.of(Integer.parseInt(yearMonth[0]));
                    Month month = Month.valueOf(yearMonth[1].toUpperCase());
                    double carbonEmissions = entry.getValue();

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
}
