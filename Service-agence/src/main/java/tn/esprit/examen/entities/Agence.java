package tn.esprit.examen.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "agences")
public class Agence implements Serializable {
    @Id
    private String idAgence;

    private String nomAg;
    private String adresse;
    private String email;
    private String telephone;
    private String siteWeb;
    private String description;
    private boolean active;

    private Long responsableId; // Lien vers un User existant
}
