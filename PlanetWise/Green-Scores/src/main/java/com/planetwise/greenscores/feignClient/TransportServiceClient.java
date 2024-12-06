package com.planetwise.greenscores.feignClient;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "TRANSIT-TRACK")
public class TransportServiceClient {
}
