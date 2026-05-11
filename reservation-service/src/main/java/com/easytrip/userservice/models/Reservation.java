package com.easytrip.userservice.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destination;
    private String dateDepart;
    private String dateRetour;
    private int nombrePersonnes;
    @ElementCollection
    private List<String> selectedOptions = new ArrayList<>();


    private Long userId; // ← Liaison avec un user du microservice "user"
}

