package com.easytrip.Avisservice.dto;


import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AvisAvecScoreDTO {
    private Long id;
    private Long utilisateurId;
    private Long voyageId;
    private int note;
    private String commentaire;
    private LocalDateTime dateAvis;
    private boolean approuve;
    private double scorePertinence;
}
