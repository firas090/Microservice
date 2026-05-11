package com.esprit.microservice.gestiondestinationservice.controller;

import com.esprit.microservice.gestiondestinationservice.Model.Destination;
import com.esprit.microservice.gestiondestinationservice.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "http://localhost:4200") // Added explicit CORS
public class DestinationController {
    private final DestinationService destinationService;

    @Autowired
    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        List<Destination> destinations = destinationService.getAllDestinations();
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        return destinationService.getDestinationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Destination> createDestination(@RequestBody Destination destination) {
        Destination savedDestination = destinationService.saveDestination(destination);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDestination);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Destination> updateDestination(@PathVariable Long id, @RequestBody Destination destination) {
        if (!destinationService.getDestinationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        destination.setId(id);
        Destination updatedDestination = destinationService.saveDestination(destination);
        return ResponseEntity.ok(updatedDestination);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDestination(@PathVariable Long id) {
        if (!destinationService.getDestinationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        destinationService.deleteDestination(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<List<Destination>> getDestinationsByCountry(@PathVariable String country) {
        List<Destination> destinations = destinationService.getDestinationsByCountry(country);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Destination>> searchDestinationsByName(@RequestParam String name) {
        List<Destination> destinations = destinationService.searchDestinationsByName(name);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/recommend/price")
    public ResponseEntity<List<Destination>> recommendByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        List<Destination> destinations = destinationService.recommendByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/recommend/category/{category}")
    public ResponseEntity<List<Destination>> recommendByCategory(@PathVariable String category) {
        List<Destination> destinations = destinationService.recommendByCategory(category);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/recommend/climate/{climate}")
    public ResponseEntity<List<Destination>> recommendByClimate(@PathVariable String climate) {
        List<Destination> destinations = destinationService.recommendByClimate(climate);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Destination>> getPopularDestinations() {
        List<Destination> destinations = destinationService.getPopularDestinations();
        return ResponseEntity.ok(destinations);
    }
}