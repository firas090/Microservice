package com.easytrip.userservice.service;

import com.easytrip.userservice.feign.WeatherClient;
import com.easytrip.userservice.models.WeatherResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {

    @Autowired
    private WeatherClient weatherClient;

    @Value("${weather.api.key}")
    private String apiKey;

    public WeatherResponse getWeatherForCity(String city) {
        return weatherClient.getWeather(city, apiKey, "metric");
    }
}
