//package com.easytrip.Avisservice.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        // Autorise les requêtes CORS de localhost:4200 uniquement
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:4200")  // Remplace par ton origine Angular
//                .allowedMethods("GET", "POST", "PUT", "DELETE") // Méthodes autorisées
//                .allowedHeaders("*")  // Autoriser tous les en-têtes
//                .allowCredentials(true);  // Si tu utilises des cookies ou des tokens
//    }
//}
