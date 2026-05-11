    package com.easytrip.userservice.models;

    import lombok.*;
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    import java.time.LocalDateTime;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Document(collection = "transports")
    public class Transport {

        @Id
        private String id;
        private String voyageId; // ou Long si tu veux référencer un voyage depuis Mongo

        private String type;
        private String compagnie;
        private int capacite;
        private String numero;
        private String villeDepart;
        private String villeArrivee;
        private LocalDateTime dateDepart;
        private LocalDateTime dateArrivee;
        private double prix;

        // 🔗 Lien vers l'utilisateur (MySQL)
        private Long userId;
    }
