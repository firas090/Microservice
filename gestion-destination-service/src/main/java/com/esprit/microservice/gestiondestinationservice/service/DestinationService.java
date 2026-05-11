package com.esprit.microservice.gestiondestinationservice.service;

import com.esprit.microservice.gestiondestinationservice.Model.Destination;
import com.esprit.microservice.gestiondestinationservice.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {
    private final DestinationRepository destinationRepository;

    @Autowired
    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    // Existing CRUD methods
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Optional<Destination> getDestinationById(Long id) {
        Optional<Destination> destination = destinationRepository.findById(id);
        if (destination.isPresent()) {
            destinationRepository.incrementViewCount(id); // Track views
        }
        return destination;
    }

    public Destination saveDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);
    }

    public List<Destination> getDestinationsByCountry(String country) {
        return destinationRepository.findByCountry(country);
    }

    public List<Destination> searchDestinationsByName(String name) {
        return destinationRepository.findByNameContainingIgnoreCase(name);
    }

    // New recommendation features
    public List<Destination> recommendByPriceRange(Double minPrice, Double maxPrice) {
        return destinationRepository.findByAveragePriceBetween(minPrice, maxPrice);
    }

    public List<Destination> recommendByCategory(String category) {
        return destinationRepository.findByCategory(category);
    }

    public List<Destination> recommendByClimate(String climate) {
        return destinationRepository.findByClimate(climate);
    }

    public List<Destination> getPopularDestinations() {
        try {
            return destinationRepository.findTop5PopularDestinations();
        } catch (Exception e) {
            // Fallback to the derived query method if the native query fails
            return destinationRepository.findTop5ByOrderByViewCountDesc();
        }
    }
}