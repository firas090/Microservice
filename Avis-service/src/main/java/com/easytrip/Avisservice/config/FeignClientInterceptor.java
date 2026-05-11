package com.easytrip.Avisservice.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FeignClientInterceptor implements RequestInterceptor {

    private final HttpServletRequest request;

    @Override
    public void apply(RequestTemplate template) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            template.header("Authorization", authHeader);
        }
    }
}
