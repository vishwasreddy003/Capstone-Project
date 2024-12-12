package com.planetwise.waste.service;

import com.planetwise.waste.dto.TrendsDto;
import com.planetwise.waste.dto.WasteDto;
import com.planetwise.waste.model.WasteProduction;

import java.time.Month;
import java.time.Year;
import java.util.List;

public interface WasteProductionService {

    WasteProduction saveWasteProduction(String username, WasteProduction wasteProduction);

    List<TrendsDto> getTrendsForWasteProduction(String username);

    Double getCarbonEmissions(String username, Year year, Month month);

     Double getLatestCarbonEmissions(String username);

     List<WasteDto> getAll(String username);
}