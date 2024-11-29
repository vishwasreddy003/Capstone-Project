package com.planetwise.energywise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EnergyWiseTrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnergyWiseTrackApplication.class, args);
	}

}
