package com.planetwise.greenscores.feignClient;

import io.swagger.v3.oas.annotations.headers.Header;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.Month;
import java.time.Year;

@FeignClient(name = "ENERGYWISE-TRACK",path="/PlanetWise/energy")
public interface EnergyServiceClient {

    @GetMapping("/{username}/getCarbonEmissions/{year}/{month}")
    public Double getCarbonEmissions(@RequestHeader("Authorization") String token,@PathVariable String username, @PathVariable Year year, @PathVariable Month month);
}
