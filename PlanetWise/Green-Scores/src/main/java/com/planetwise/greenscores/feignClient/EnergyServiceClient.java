package com.planetwise.greenscores.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ENERGYWISE-TRACK")
public interface EnergyServiceClient {

}
