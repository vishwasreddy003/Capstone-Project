package com.planetwise.waste.controller;

import com.planetwise.waste.service.WasteProductionService;
import com.planetwise.waste.model.WasteProduction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/PlanetWise/WasteProduction")
public class WasteController {

    @Autowired
    private WasteProductionService wasteProductionService;

    @PostMapping("/{username}/addWasteData")
    public ResponseEntity<WasteProduction> saveWasteData(@PathVariable String username, @RequestBody WasteProduction wasteProduction) {
        WasteProduction savedWaste = wasteProductionService.saveWasteProduction(username,wasteProduction);
        return new ResponseEntity<>(savedWaste, HttpStatus.CREATED);
    }

    @GetMapping("/{username}/analytics")
    public ResponseEntity<List<WasteProduction>> getAnalyticsForWasteProduction(@PathVariable String username) {
        List<WasteProduction> wasteTrends = wasteProductionService.getTrendsForWasteProduction(username);
        return new ResponseEntity<>(wasteTrends, HttpStatus.OK);
    }
}
