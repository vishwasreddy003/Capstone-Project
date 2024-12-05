package com.planetwise.energywise.controller;

import com.planetwise.energywise.model.EnergyConsumption;
import com.planetwise.energywise.service.EnergyConsumptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/PlanetWise/energy")
public class EnergyConsumptionController {

    @Autowired
    private EnergyConsumptionService energyService;

    @PostMapping("/{username}/addData")
    public ResponseEntity<EnergyConsumption> addEnergyConsumption(@PathVariable String username,@RequestBody EnergyConsumption energyConsumption) {
        EnergyConsumption savedData = energyService.saveEnergyConsumption(username,energyConsumption);
        return new ResponseEntity<>(savedData, HttpStatus.CREATED);
    }

    @GetMapping("/{username}/analytics")
    public ResponseEntity<List<EnergyConsumption>> getAnalytics(@PathVariable String username) {
        List<EnergyConsumption> analytics = energyService.getUserTrendsForEnergyConsumption(username);
        return new ResponseEntity<>(analytics, HttpStatus.OK);
    }
}
