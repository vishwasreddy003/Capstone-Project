package com.planetwise.greenscores.feignClient;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name="WASTE-TRACK")
public interface WasteServiceClient {

}