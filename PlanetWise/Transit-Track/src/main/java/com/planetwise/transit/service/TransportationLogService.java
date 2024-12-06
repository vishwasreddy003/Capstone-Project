package com.planetwise.transit.service;

import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.model.TransportationMode;

import java.time.Month;
import java.util.List;
import java.util.Map;

public interface TransportationLogService {
    public TransportationLog addTransportationUsage(String username,TransportationLog transportationLog);

    public List<TransportationLog> getUserTransportationLog(String username);

    public List<TransportationLog> getUserTransportationLogByTransportMode(String username, TransportationMode transportationMode);

    public List<TransportationLog> getUserTransportationLogByFuelType(String username, FuelType fuelType);

    public Map<Month,Double> getTrendsForTransportation(String username);

    Double getCarbonEmissions(String username);
}
