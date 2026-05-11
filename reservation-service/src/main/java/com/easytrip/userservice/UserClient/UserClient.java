package com.easytrip.userservice.UserClient;

import com.easytrip.userservice.dto.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// 🔐 Ajout de la config personnalisée pour transmettre l'Authorization header
@FeignClient(
        name = "user-service",
        configuration = com.easytrip.userservice.config.FeignClientInterceptor.class
)
public interface UserClient {
    @GetMapping("/api/users/{id}")
    UserResponse getUserById(@PathVariable("id") Long id);
}

