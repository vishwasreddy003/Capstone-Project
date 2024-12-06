package com.planetwise.energywise.service;

import com.planetwise.energywise.model.EnergyConsumption;

import java.util.List;

public interface EnergyConsumptionService {
    EnergyConsumption saveEnergyConsumption(String username,EnergyConsumption energyConsumption);

    List<EnergyConsumption> getUserTrendsForEnergyConsumption(String username);

    Double getCarbonEmissions(String username);
}
