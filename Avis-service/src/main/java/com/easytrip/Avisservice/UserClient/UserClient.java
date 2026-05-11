package com.easytrip.Avisservice.UserClient;

import com.easytrip.Avisservice.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service") // Nom du service dans Eureka
public interface UserClient {

    @GetMapping("/api/users/{id}") // route exposée par user-service
    UserDTO getUserById(@PathVariable("id") Long id);
}
