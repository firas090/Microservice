package com.esprit.microservice.gestiondestinationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableDiscoveryClient
@EnableFeignClients
@SpringBootApplication
@EntityScan("com.esprit.microservice.gestiondestinationservice.Model")  // Add this
@EnableJpaRepositories("com.esprit.microservice.gestiondestinationservice.repository")  // And this
public class GestionDestinationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionDestinationServiceApplication.class, args);
    }
}