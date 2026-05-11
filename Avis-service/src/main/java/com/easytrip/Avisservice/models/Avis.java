package com.easytrip.Avisservice.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Avis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long utilisateurId;      // ID de l'utilisateur qui a laissé l'avis
    private Long voyageId;          // ID du voyage concerné

    private int note;               // Note de 1 à 5
    private String commentaire;     // Contenu de l'avis


    @Column(name = "date_avis")
    private LocalDateTime dateAvis;

    private boolean approuve;       // Si l’avis a été validé/modéré

    @PrePersist
    protected void onCreate() {
        this.dateAvis = LocalDateTime.now();
    }
}
