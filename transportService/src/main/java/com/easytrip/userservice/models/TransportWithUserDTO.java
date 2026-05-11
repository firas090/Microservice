package com.easytrip.userservice.models;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TransportWithUserDTO {
    private String id;
    private String voyageId;
    private String type;
    private String compagnie;
    private int capacite;
    private String numero;
    private String villeDepart;
    private String villeArrivee;
    private LocalDateTime dateDepart;
    private LocalDateTime dateArrivee;
    private double prix;

    private UserDTO user;
}
