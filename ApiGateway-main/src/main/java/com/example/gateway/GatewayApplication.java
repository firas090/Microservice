package com.example.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient //eureka
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder){

        return builder.routes()
                .route("agence-service", r -> r
                        .path("/api/agences/**")
                           .uri("http://localhost:8089"))
                .route("reservation-service", r -> r
                        .path("/api/reservations/**")
                        .uri("http://localhost:8085")) // utiliser le nom Eureka ici

                .route("transport-service", r -> r
                        .path("/api/transports/**")
                        .uri("http://localhost:8081")) // nom exact de ton application Eureka
                .route("user-service", r -> r
                        .path("/api/users/**")
                        .uri("http://localhost:8082"))

                .route("avis-service", r -> r
                        .path("/api/avis/**")
                        .uri("http://localhost:8083")) // nom exact de ton application Eureka

                .route("gestion-destination-service", r -> r
                        .path("/api/destinations/**")
                        .uri("http://localhost:8087"))

 
                .build();



    }

}