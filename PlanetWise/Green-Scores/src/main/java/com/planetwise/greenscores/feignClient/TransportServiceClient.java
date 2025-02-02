package com.planetwise.greenscores.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.Month;
import java.time.Year;

@FeignClient(name = "TRANSIT-TRACK",path="/PlanetWise/transportation")
public interface TransportServiceClient {
    @GetMapping("/{username}/getCarbonEmissions/{year}/{month}")
    public Double getCarbonEmissions(@RequestHeader("Authorization") String token,@PathVariable String username, @PathVariable Year year, @PathVariable Month month);
}
