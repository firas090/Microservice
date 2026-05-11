package com.esprit.microservice.gestiondestinationservice.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "destination")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String country;

    private String description;

    @Column(name = "average_price", nullable = false)
    private Double averagePrice;

    @Column(name = "view_count", nullable = false, columnDefinition = "integer default 0")
    private Integer viewCount = 0;

    @Column(nullable = false)
    private String category; // e.g., Beach, Mountain, City, etc.

    @Column(nullable = false)
    private String climate; // e.g., Tropical, Temperate, Arctic, etc.

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}