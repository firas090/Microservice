package tn.esprit.examen.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.entities.Agence;
import tn.esprit.examen.services.IExamenService;

import javax.mail.MessagingException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/agences")
//@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ExamenController {

    private final IExamenService examenService;

    @PostMapping("/add-agence")
    public ResponseEntity<Agence> addAgence(@RequestBody Agence agence) {
        return ResponseEntity.ok(examenService.addAgence(agence));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Agence>> getAllAgences() {
        return ResponseEntity.ok(examenService.getAllAgences());
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Agence> getAgenceById(@PathVariable String id) {
        return ResponseEntity.ok(examenService.getAgenceById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Agence> updateAgence(@PathVariable String id, @RequestBody Agence agence) {
        return ResponseEntity.ok(examenService.updateAgence(id, agence));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAgence(@PathVariable String id) {
        examenService.deleteAgence(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/Lister agences avec User responsable")
    public ResponseEntity<List<Map<String, Object>>> getAgencesWithResponsables() {
        return ResponseEntity.ok(examenService.getAgencesWithResponsables());
    }

    @GetMapping("/Trouver agences par user/{userId}")
    public ResponseEntity<List<Agence>> getAgencesByResponsable(@PathVariable Long userId) {
        return ResponseEntity.ok(examenService.getAgencesByResponsableId(userId));
    }

    @PutMapping("/{id}/active_desactiver")
    public ResponseEntity<Agence> updateAgenceStatus(@PathVariable String id, @RequestParam boolean active) {
        return ResponseEntity.ok(examenService.toggleActiveStatus(id, active));
    }

    @GetMapping("/stats/Nombre d’agences par rôle")
    public ResponseEntity<Long> getNombreAgencesParRole(@RequestParam String role) {
        return ResponseEntity.ok(examenService.getNombreAgencesParRole(role));
    }

    @GetMapping("/search_par_nom_adresse_status")
    public ResponseEntity<List<Agence>> searchAgences(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String adresse,
            @RequestParam(required = false) Boolean active
    ) {
        return ResponseEntity.ok(examenService.searchAgences(nom, adresse, active));
    }

    @GetMapping("/top-N-responsables")
    public ResponseEntity<List<Map<String, Object>>> getTopResponsables(
            @RequestParam(defaultValue = "3") int limit
    ) {
        return ResponseEntity.ok(examenService.getTopResponsables(limit));
    }

    @GetMapping("/export_agence_with_responsable/csv")
    public ResponseEntity<byte[]> exportCSV() throws IOException {
        String csvData = examenService.exportAgencesWithResponsablesCSV();
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=agences.csv")
                .header("Content-Type", "text/csv")
                .body(csvData.getBytes(StandardCharsets.UTF_8));
    }

    @GetMapping("/stats/actives_vs_inactives_par_ville")
    public ResponseEntity<Map<String, Map<String, Long>>> getStatsParVille() {
        return ResponseEntity.ok(examenService.getStatistiquesParVilleEtStatut());
    }

    @GetMapping("/stats/disponibilite-par-ville")
    public ResponseEntity<Map<String, Double>> getTauxParVille() {
        return ResponseEntity.ok(examenService.getTauxDisponibiliteParVille());
    }

    @GetMapping("/compare")
    public ResponseEntity<Map<String, Object>> comparerResponsables(
            @RequestParam Long user1,
            @RequestParam Long user2
    ) {
        return ResponseEntity.ok(examenService.comparerResponsables(user1, user2));
    }

    @GetMapping("/export/pdf/actives")
    public ResponseEntity<byte[]> exportActivesAsPdf() throws IOException {
        byte[] pdfData = examenService.generateActiveAgencesPdf();
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=agences-actives.pdf")
                .header("Content-Type", "application/pdf")
                .body(pdfData);
    }

    @PostMapping("/mail/send")
    public ResponseEntity<String> sendAgencesByEmail(@RequestParam String to) throws IOException, MessagingException {
        examenService.envoyerAgencesParEmail(to);
        return ResponseEntity.ok("Email envoyé à " + to);
    }
}