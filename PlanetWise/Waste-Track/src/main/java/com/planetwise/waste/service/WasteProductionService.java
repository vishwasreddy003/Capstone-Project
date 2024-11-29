package com.planetwise.waste.service;

import com.planetwise.waste.model.WasteProduction;

import java.util.List;

public interface WasteProductionService {

     WasteProduction saveWasteProduction(String username,WasteProduction wasteProduction);

     List<WasteProduction> getTrendsForWasteProduction(String username);

}