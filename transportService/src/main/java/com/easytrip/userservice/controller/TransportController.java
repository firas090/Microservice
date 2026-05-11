package com.easytrip.userservice.controller;

import com.easytrip.userservice.models.Transport;
import com.easytrip.userservice.models.TransportWithUserDTO;
import com.easytrip.userservice.models.WeatherResponse;
import com.easytrip.userservice.service.TransportService;
import com.easytrip.userservice.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transports") // plus cohérent avec la ressource
//@CrossOrigin(origins = "http://localhost:4200")
public class TransportController {

    @Autowired
    private TransportService transportService;
    @Autowired
    private WeatherService weatherService;

    @GetMapping
    public List<Transport> getAll() {
        return transportService.getAllTransports();
    }

    @GetMapping("/{id}")
    public Transport getById(@PathVariable String id) {
        return transportService.getTransportById(id);
    }

    @PostMapping
    public Transport create(@RequestBody Transport transport) {
        return transportService.createTransport(transport);
    }



    @PutMapping("/{id}")
    public Transport update(@PathVariable String id, @RequestBody Transport updatedTransport) {
        return transportService.updateTransport(id, updatedTransport);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        transportService.deleteTransport(id);
    }

    @GetMapping("/user/{userId}")
    public List<Transport> getByUserId(@PathVariable Long userId) {
        return transportService.getTransportsByUserId(userId);
    }
    // 🚀 Nouvelle fonctionnalité avancée : détails utilisateur liés à un transport
    @GetMapping("/{id}/with-user")
    public TransportWithUserDTO getTransportWithUser(@PathVariable String id) {
        return transportService.getTransportWithUserDetails(id);
    }
    @GetMapping("/{id}/weather")
    public WeatherResponse getWeatherForTransport(@PathVariable String id) {
        Transport transport = transportService.getTransportById(id);
        if (transport == null) {
            throw new RuntimeException("Transport not found");
        }

        try {
            return weatherService.getWeatherForCity(transport.getVilleDepart());
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la récupération de la météo : " + e.getMessage());
        }
    }


}
