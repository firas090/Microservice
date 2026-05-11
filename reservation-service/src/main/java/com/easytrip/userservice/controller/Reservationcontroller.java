package com.easytrip.userservice.controller;

import com.easytrip.userservice.models.Reservation;
import com.easytrip.userservice.service.IReservationService;
import com.easytrip.userservice.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
public class Reservationcontroller {
    @Autowired
    private IReservationService reservationService;

    @GetMapping
    public List<Reservation> getAll() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Reservation getById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @PostMapping
    public Reservation create(@RequestBody Reservation reservation) {
        System.out.println("🔍 userId = " + reservation.getUserId());
        return reservationService.createReservation(reservation);
    }


    @PutMapping("/{id}")
    public Reservation update(@PathVariable Long id, @RequestBody Reservation r) {
        return reservationService.updateReservation(id, r);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    // 🔥 Nouvelle méthode pour récupérer la réservation avec les infos utilisateur
    @GetMapping("/{id}/details")
    public ResponseEntity<Map<String, Object>> getReservationWithUser(@PathVariable Long id) {
        Map<String, Object> result = reservationService.getReservationWithUser(id);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = reservationService.getStatistics();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/recommendations/{userId}")
    public ResponseEntity<List<String>> getRecommendations(@PathVariable Long userId) {
        List<String> recommendations = reservationService.recommendDestinations(userId);
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/{id}/ticket")
    public ResponseEntity<byte[]> generateTicket(@PathVariable Long id) throws Exception {
        byte[] pdf = reservationService.generateReservationTicket(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ticket.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/{id}/options")
    public ResponseEntity<List<String>> getOptions(@PathVariable Long id) {
        List<String> options = reservationService.getAvailableOptionsForReservation(id);
        return ResponseEntity.ok(options);
    }

    @PostMapping("/{id}/options")
    public ResponseEntity<?> addOptionsToReservation(
            @PathVariable Long id,
            @RequestBody List<String> selectedOptions) {

        Reservation reservation = reservationService.getReservationById(id);
        if (reservation == null) {
            return ResponseEntity.notFound().build();
        }

        reservation.setSelectedOptions(selectedOptions);
        reservationService.updateReservation(id, reservation);

        // ✅ Option 1 : retourne une réponse vide
        return ResponseEntity.ok().build();

    }


    @GetMapping("/{id}/selected-options")
    public ResponseEntity<List<String>> getSelectedOptions(@PathVariable Long id) {
        Reservation reservation = reservationService.getReservationById(id);
        if (reservation == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reservation.getSelectedOptions());
    }
}