package com.easytrip.Avisservice.controller;
import com.easytrip.Avisservice.Repository.AvisRepository;
import com.easytrip.Avisservice.UserClient.UserClient;
import com.easytrip.Avisservice.dto.AvisAvecScoreDTO;
import com.easytrip.Avisservice.dto.UserDTO;
import com.easytrip.Avisservice.models.Avis;
import com.easytrip.Avisservice.models.ReactionAvis;
import com.easytrip.Avisservice.service.AvisService;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/avis")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*") // à adapter si tu veux restreindre l'accès CORS
//@CrossOrigin(origins = "http://localhost:4200")
public class AvissController {

    private final AvisService avisService;

    private final UserClient userClient;
    private final AvisRepository avisRepository;
@PostMapping("/addAvis")
public ResponseEntity<?> createAvis(@RequestBody Avis avis, @RequestHeader("X-User-Id") Long userId) {
    try {
        // 🔁 Injecter automatiquement l'id utilisateur dans l'objet Avis
        avis.setUtilisateurId(userId);

        // 🔎 Vérifier si l'utilisateur existe
        UserDTO user = userClient.getUserById(userId);

        // 💾 Créer l'avis
        Avis savedAvis = avisService.createAvis(avis);
        return ResponseEntity.ok(savedAvis);

    } catch (FeignException.NotFound e) {
        return ResponseEntity.status(404).body("Utilisateur avec l'ID " + userId + " introuvable.");

    } catch (FeignException e) {
        return ResponseEntity.status(500).body("Erreur lors de la communication avec user-service : " + e.getMessage());

    } catch (Exception e) {
        return ResponseEntity.status(500).body("Erreur lors de la création de l'avis : " + e.getMessage());
    }

}

    @GetMapping("/getavis/{id}")
    public ResponseEntity<?> getAvisById(@PathVariable Long id) {
        try {
            Avis avis = avisService.getAvisById(id);
            UserDTO user = userClient.getUserById(avis.getUtilisateurId());

            Map<String, Object> response = new HashMap<>();
            response.put("avis", avis);
            response.put("utilisateur", user);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/utilisateur/{utilisateurId}")
    public ResponseEntity<?> getAvisByUtilisateur(@PathVariable Long utilisateurId) {
        try {
            List<Avis> avisList = avisService.getAvisByUtilisateurId(utilisateurId);
            return ResponseEntity.ok(avisList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la récupération des avis : " + e.getMessage());
        }
    }



    @GetMapping
    public ResponseEntity<List<Avis>> getAllAvis() {
        return ResponseEntity.ok(avisService.getAllAvis());
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Avis> updateAvis(@PathVariable Long id, @RequestBody Avis updatedAvis) {
//        return ResponseEntity.ok(avisService.updateAvis(id, updatedAvis));
//    }
//@PutMapping("/{id}")
//public ResponseEntity<Avis> updateAvis(@PathVariable Long id, @RequestBody Avis updatedAvis, @RequestHeader("X-User-Id") Long userId) {
//    Avis avis = avisService.getAvisById(id);
//
//    // Vérifier si l'ID utilisateur correspond à celui de l'avis
//    if (!avis.getUtilisateurId().equals(userId)) {
//        return ResponseEntity.status(403).body(null); // Forbidden si l'utilisateur n'est pas le propriétaire
//    }
//
//    return ResponseEntity.ok(avisService.updateAvis(id, updatedAvis));
//}

    @PutMapping("/{id}")
    public ResponseEntity<Avis> updateAvis(
            @PathVariable Long id,
            @RequestBody Avis updatedAvis,
            @RequestHeader("X-User-Id") Long userId) {

        // Récupérer l'avis existant
        Avis avis = avisService.getAvisById(id);

        // Vérifier si l'utilisateur correspond à l'auteur de l'avis
        if (!avis.getUtilisateurId().equals(userId)) {
            return ResponseEntity.status(403).body(null);  // Forbidden si l'utilisateur n'est pas le propriétaire
        }

        // Mettre à jour l'avis
        Avis updated = avisService.updateAvis(id, updatedAvis);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvis(@PathVariable Long id, @RequestHeader("X-User-Id") Long userId) {
        Avis avis = avisService.getAvisById(id);

        // Vérifier si l'ID utilisateur correspond à celui de l'avis
        if (!avis.getUtilisateurId().equals(userId)) {
            return ResponseEntity.status(403).build(); // Forbidden si l'utilisateur n'est pas le propriétaire
        }

        avisService.deleteAvis(id);
        return ResponseEntity.noContent().build();
    }



//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteAvis(@PathVariable Long id) {
//        avisService.deleteAvis(id);
//        return ResponseEntity.noContent().build();
//    }

    // 🔍 Recherche avancée
    @GetMapping("/recherche")
    public List<Avis> rechercherAvis(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long voyageId,
            @RequestParam(required = false) Boolean approuve
    ) {
        String motCle = keyword != null ? keyword : "";
        return avisRepository.searchAvis(motCle, voyageId, approuve);
    }

    // ⭐ Liste triée par pertinence (pondération)
    @GetMapping("/pertinents")
    public List<AvisAvecScoreDTO> avisParPertinence() {
        List<Avis> tousLesAvis = avisRepository.findAll();

        return tousLesAvis.stream()
                .map(avis -> AvisAvecScoreDTO.builder()
                        .id(avis.getId())
                        .utilisateurId(avis.getUtilisateurId())
                        .voyageId(avis.getVoyageId())
                        .note(avis.getNote())
                        .commentaire(avis.getCommentaire())
                        .dateAvis(avis.getDateAvis())
                        .approuve(avis.isApprouve())
                        .scorePertinence(calculerScorePondere(avis))
                        .build())
                .sorted((a1, a2) -> Double.compare(a2.getScorePertinence(), a1.getScorePertinence()))
                .toList();
    }


    // 🧠 Méthode de calcul du score pondéré
    private double calculerScorePondere(Avis avis) {
        double base = avis.getNote();
        long joursDepuis = ChronoUnit.DAYS.between(avis.getDateAvis(), LocalDateTime.now());
        double facteurTemps = 1.0 / (1 + (joursDepuis / 30.0)); // diminue tous les 30 jours
        double facteurApprouve = avis.isApprouve() ? 1.2 : 0.8;
        return base * facteurTemps * facteurApprouve;
    }

    // ✅ Endpoint pour approuver ou refuser un avis
    @PutMapping("/{id}/moderer")
    public ResponseEntity<Avis> approuverOuRefuserAvis(
            @PathVariable Long id,
            @RequestParam boolean approuve) {

        Avis avisMisAJour = avisService.modererAvis(id, approuve);
        return ResponseEntity.ok(avisMisAJour);
    }

    //like/dislike
    @PostMapping("/{avisId}/user/{userId}")
    public ResponseEntity<ReactionAvis> ajouterReaction(
            @PathVariable Long avisId,
            @PathVariable Long userId,
            @RequestParam boolean liked) {

        ReactionAvis reaction = avisService.ajouterReaction(avisId, userId, liked);
        return ResponseEntity.ok(reaction);
    }

    @GetMapping("/{avisId}")
    public ResponseEntity<List<ReactionAvis>> getReactions(@PathVariable Long avisId) {
        return ResponseEntity.ok(avisService.getReactionsByAvis(avisId));
    }
}
