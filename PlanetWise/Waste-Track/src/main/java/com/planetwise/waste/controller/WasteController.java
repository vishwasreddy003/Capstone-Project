package com.planetwise.waste.controller;

import com.planetwise.waste.service.WasteProductionService;
import com.planetwise.waste.model.WasteProduction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.time.Year;
import java.util.List;

@RestController
@RequestMapping("/PlanetWise/WasteProduction")
public class WasteController {

    @Autowired
    private WasteProductionService wasteProductionService;

    @PostMapping("/{username}/addData")
    public ResponseEntity<WasteProduction> saveWasteData(@PathVariable String username, @RequestBody WasteProduction wasteProduction) {
        wasteProduction.setUsername(username);
        WasteProduction savedWaste = wasteProductionService.saveWasteProduction(username,wasteProduction);
        return new ResponseEntity<>(savedWaste, HttpStatus.CREATED);
    }

    @GetMapping("/{username}/analytics")
    public ResponseEntity<List<WasteProduction>> getAnalyticsForWasteProduction(@PathVariable String username) {
        List<WasteProduction> wasteTrends = wasteProductionService.getTrendsForWasteProduction(username);
        return new ResponseEntity<>(wasteTrends, HttpStatus.OK);
    }

    @GetMapping("/{username}/getCarbonEmissions/{year}/{month}")
    public Double getCarbonEmissions(@PathVariable String username, @PathVariable Year year, @PathVariable Month month ){
        return wasteProductionService.getCarbonEmissions(username, year, month);
    }

    @GetMapping("/{username}/latest")
    public Double getCarbonEmissions(@PathVariable String username){
        return wasteProductionService.getLatestCarbonEmissions(username);
    }
}
