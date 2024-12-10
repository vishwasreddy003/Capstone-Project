package com.planetwise.energywise.controller;

import com.planetwise.energywise.dto.TrendsDto;
import com.planetwise.energywise.model.EnergyConsumption;
import com.planetwise.energywise.service.EnergyConsumptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.time.Year;
import java.util.List;

@RestController
@RequestMapping("/PlanetWise/energy")
public class EnergyConsumptionController {

    @Autowired
    private EnergyConsumptionService energyService;

    @PostMapping("/{username}/addData")
    public ResponseEntity<EnergyConsumption> addEnergyConsumption(@PathVariable String username,@RequestBody EnergyConsumption energyConsumption) {
        energyConsumption.setUsername(username);
        EnergyConsumption savedData = energyService.saveEnergyConsumption(username,energyConsumption);
        return new ResponseEntity<>(savedData, HttpStatus.CREATED);
    }

    @GetMapping("/{username}/analytics")
    public ResponseEntity<List<TrendsDto>> getAnalytics(@PathVariable String username) {
        List<TrendsDto> analytics = energyService.getUserTrendsForEnergyConsumption(username);
        return new ResponseEntity<>(analytics, HttpStatus.OK);
    }

    @GetMapping("/{username}/getCarbonEmissions/{year}/{month}")
    public Double getCarbonEmissions(@PathVariable String username, @PathVariable Year year, @PathVariable Month month ) {
        return energyService.getCarbonEmissions(username, year, month);
    }

    @GetMapping("/{username}/latest")
    public Double getCarbonEmissions(@PathVariable String username){
        return energyService.getLatestCarbonEmissions(username);
    }
}
