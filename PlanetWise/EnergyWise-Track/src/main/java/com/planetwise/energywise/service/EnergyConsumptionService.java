package com.planetwise.energywise.service;

import com.planetwise.energywise.dto.EnergyDto;
import com.planetwise.energywise.dto.TrendsDto;
import com.planetwise.energywise.model.EnergyConsumption;

import java.time.Month;
import java.time.Year;
import java.util.List;

public interface EnergyConsumptionService {
    EnergyConsumption saveEnergyConsumption(String username,EnergyConsumption energyConsumption);

    List<TrendsDto> getUserTrendsForEnergyConsumption(String username);

    Double getCarbonEmissions(String username, Year year, Month month);

    Double getLatestCarbonEmissions(String username);

    List<EnergyDto> getAll(String username);
}
