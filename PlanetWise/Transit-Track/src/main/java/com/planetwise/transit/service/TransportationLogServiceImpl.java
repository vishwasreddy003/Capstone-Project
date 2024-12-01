package com.planetwise.transit.service;

import com.planetwise.transit.exception.DataNotFoundException;
import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.model.TransportationMode;
import com.planetwise.transit.repository.TransportationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class TransportationLogServiceImpl implements TransportationLogService{

    @Autowired
    private TransportationLogRepository transportRepo;

    @Override
    public TransportationLog addTransportationUsage(TransportationLog transportationLog) {
        // Need to change this function. this function should also get username variable
        return transportRepo.save(transportationLog);
    }

    @Override
    public List<TransportationLog> getUserTransportationLog(String username) {
        if(transportRepo.findByUsername(username) != null || !transportRepo.findByUsername(username).isEmpty()){
            return transportRepo.findByUsername(username);
        }else {
            throw new DataNotFoundException("No Data to show Trends");
        }
    }

    @Override
    public List<TransportationLog> getUserTransportationLogByTransportMode(String username, TransportationMode transportationMode) {
        if(transportRepo.findByUsernameAndTransportMode(username,transportationMode) != null || !transportRepo.findByUsernameAndTransportMode(username,transportationMode).isEmpty()){
            return transportRepo.findByUsernameAndTransportMode(username,transportationMode);
        }else {
            throw new DataNotFoundException("No Data to show Trends");
        }
    }

    @Override
    public List<TransportationLog> getUserTransportationLogByFuelType(String username, FuelType fuelType) {

        if(transportRepo.findByUsernameAndFuelType(username,fuelType) != null || !transportRepo.findByUsernameAndFuelType(username,fuelType).isEmpty()){
            return transportRepo.findByUsernameAndFuelType(username,fuelType);
        }else {
            throw new DataNotFoundException("No Data to show Trends");
        }
    }
    public Map<Month, Double> getTrendsForTransportation(String username) {

        List<Object[]> results = transportRepo.findMonthlyCarbonEmissionsByUsername(username);
        Map<Month, Double> monthlyEmissions = new HashMap<>();

        for (Object[] result : results) {
            Month month = (Month) result[0];
            Double emissions = (Double) result[1];
            monthlyEmissions.put(month, emissions);
        }

        return monthlyEmissions;
    }


}
