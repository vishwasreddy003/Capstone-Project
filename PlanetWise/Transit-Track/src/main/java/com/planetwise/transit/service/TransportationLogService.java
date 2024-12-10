package com.planetwise.transit.service;

import com.planetwise.transit.dto.TrendsDto;
import com.planetwise.transit.model.TransportationLog;

import java.time.Month;
import java.time.Year;
import java.util.List;

public interface TransportationLogService {
    public TransportationLog addTransportationUsage(String username,TransportationLog transportationLog);


    public List<TrendsDto> getTrendsForTransportation(String username);

    Double getCarbonEmissions(String username, Year year, Month month);

    Double getLatestCarbonEmissions(String username);
}
