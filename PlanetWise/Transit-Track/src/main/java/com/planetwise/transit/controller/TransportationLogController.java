package com.planetwise.transit.controller;

import com.planetwise.transit.dto.TransportDto;
import com.planetwise.transit.dto.TrendsDto;
import com.planetwise.transit.model.FuelType;
import com.planetwise.transit.model.TransportationLog;
import com.planetwise.transit.model.TransportationMode;
import com.planetwise.transit.service.TransportationLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/PlanetWise/transportation")
public class TransportationLogController {

    @Autowired
    private TransportationLogService transportationLogService;

    @PostMapping("/{username}/addData")
    public ResponseEntity<TransportationLog> saveTransportationLog(@PathVariable String username,@RequestBody TransportationLog transportationLog) {
        transportationLog.setUsername(username);
        TransportationLog savedLog = transportationLogService.addTransportationUsage(username,transportationLog);
        return new ResponseEntity<>(savedLog, HttpStatus.CREATED);
    }


    @GetMapping("/{username}/analytics")
    public ResponseEntity<List<TrendsDto>> getUserMonthlyCarbonEmissions(@PathVariable String username) {
        List<TrendsDto> emissions = transportationLogService.getTrendsForTransportation(username);
        return ResponseEntity.ok(emissions);
    }

    @GetMapping("/{username}/getCarbonEmissions/{year}/{month}")
    public Double getCarbonEmissions(@PathVariable String username, @PathVariable Year year, @PathVariable Month month ){
        return transportationLogService.getCarbonEmissions(username,year,month);
    }

    @GetMapping("/{username}/latest")
    public Double getCarbonEmissions(@PathVariable String username){
        return transportationLogService.getLatestCarbonEmissions(username);
    }

    @GetMapping("/{username}/getAll")
    public List<TransportDto> getAll(@PathVariable String username){
        return transportationLogService.getAll(username);
    }

}
