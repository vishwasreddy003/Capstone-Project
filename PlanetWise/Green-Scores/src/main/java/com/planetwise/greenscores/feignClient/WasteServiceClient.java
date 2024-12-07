package com.planetwise.greenscores.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.Month;
import java.time.Year;

@FeignClient(name="WASTE-TRACK")
public interface WasteServiceClient {
    @GetMapping("/{username}/getCarbonEmissions")
    public Double getCarbonEmissions(@PathVariable String username, @RequestHeader("Authorization") String authToken, @PathVariable Year year, @PathVariable Month month);

}
