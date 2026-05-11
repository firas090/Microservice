package com.easytrip.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.easytrip.userservice.feign")
public class TransportServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(TransportServiceApplication.class, args);
	}
}

