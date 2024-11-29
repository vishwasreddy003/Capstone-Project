package com.planetwise.waste;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class WasteTrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(WasteTrackApplication.class, args);
	}

}
