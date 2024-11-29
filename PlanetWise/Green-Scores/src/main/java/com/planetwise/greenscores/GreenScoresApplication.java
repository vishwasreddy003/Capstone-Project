package com.planetwise.greenscores;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class GreenScoresApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenScoresApplication.class, args);
	}

}
