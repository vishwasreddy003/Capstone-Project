package com.planetwise.transit.controller;

import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.model.TransportationMode;
import com.planetwise.transit.service.TransportationLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/PlanetWise/transportation")
public class TransportationLogController {

    @Autowired
    private TransportationLogService transportationLogService;

    @PostMapping
    public ResponseEntity<TransportationLog> saveTransportationLog(@RequestBody TransportationLog transportationLog) {
        TransportationLog savedLog = transportationLogService.addTransportationUsage(transportationLog);
        return new ResponseEntity<>(savedLog, HttpStatus.CREATED);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<TransportationLog>> getAnalyticsOfTransportation(@PathVariable String username) {
        List<TransportationLog> logs = transportationLogService.getUserTransportationLog(username);
        return new ResponseEntity<>(logs, HttpStatus.OK);
    }

    @GetMapping("/type/{username}/{mode}")
    public ResponseEntity<List<TransportationLog>> getAnalyticsOfTransportationByMode(@PathVariable String username, @PathVariable TransportationMode mode) {
        List<TransportationLog> logsByMode = transportationLogService.getUserTransportationLogByTransportMode(username, mode);
        return new ResponseEntity<>(logsByMode, HttpStatus.OK);
    }

    @GetMapping("/mode/{userId}/{type}")
    public ResponseEntity<List<TransportationLog>> getAnalyticsOfTransportationByType(@PathVariable String username, @PathVariable FuelType type) {
        List<TransportationLog> logsByType = transportationLogService.getUserTransportationLogByFuelType(username, type);
        return new ResponseEntity<>(logsByType, HttpStatus.OK);
    }

    @GetMapping("/emissions/{username}")
    public ResponseEntity<Map<Month, Float>> getUserMonthlyCarbonEmissions(@PathVariable String username) {
        Map<Month, Float> emissions = transportationLogService.getTrendsForTransportation(username);
        return ResponseEntity.ok(emissions);
    }

}
