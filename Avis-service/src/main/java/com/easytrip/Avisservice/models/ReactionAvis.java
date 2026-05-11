package com.easytrip.Avisservice.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReactionAvis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;  // Celui qui a réagi

    private boolean liked;  // true = like, false = dislike

    @ManyToOne
    @JoinColumn(name = "avis_id")
    private Avis avis;
}
