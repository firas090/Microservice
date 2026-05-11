package com.esprit.microservice.gestiondestinationservice.repository;

import com.esprit.microservice.gestiondestinationservice.Model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findByCountry(String country);

    List<Destination> findByNameContainingIgnoreCase(String name);

    List<Destination> findByAveragePriceBetween(Double minPrice, Double maxPrice);

    List<Destination> findByCategory(String category);

    List<Destination> findByClimate(String climate);

    // H2 compatibility fix: use native query with correct syntax
    @Query(value = "SELECT * FROM destination ORDER BY view_count DESC LIMIT 5", nativeQuery = true)
    List<Destination> findTop5PopularDestinations();

    // Alternative method without native query
    List<Destination> findTop5ByOrderByViewCountDesc();

    @Transactional
    @Modifying
    @Query("UPDATE Destination d SET d.viewCount = d.viewCount + 1 WHERE d.id = :id")
    void incrementViewCount(Long id);
}