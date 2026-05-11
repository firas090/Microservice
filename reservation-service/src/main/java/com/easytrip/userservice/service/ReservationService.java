package com.easytrip.userservice.service;

import com.easytrip.userservice.Repository.ReservationRepository;
import com.easytrip.userservice.UserClient.UserClient;
import com.easytrip.userservice.dto.UserResponse;
import com.easytrip.userservice.models.Reservation;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReservationService implements IReservationService {

    private final ReservationRepository reservationRepository;
    private final UserClient userClient;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, UserClient userClient) {
        this.reservationRepository = reservationRepository;
        this.userClient = userClient;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public Reservation createReservation(Reservation reservation) {
        UserResponse user = userClient.getUserById(reservation.getUserId());
        System.out.println("Réservation pour : " + user.getFirstname() + " " + user.getLastname());
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(Long id, Reservation updated) {
        Reservation r = reservationRepository.findById(id).orElse(null);
        if (r != null) {
            r.setDestination(updated.getDestination());
            r.setDateDepart(updated.getDateDepart());
            r.setDateRetour(updated.getDateRetour());
            r.setNombrePersonnes(updated.getNombrePersonnes());

            // ✅ Ajoute cette ligne pour prendre en compte les options
            r.setSelectedOptions(updated.getSelectedOptions());

            return reservationRepository.save(r);
        }
        return null;
    }


    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public Map<String, Object> getReservationWithUser(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) return null;

        UserResponse user = userClient.getUserById(reservation.getUserId());

        Map<String, Object> result = new HashMap<>();
        result.put("reservation", reservation);
        result.put("user", user);
        return result;
    }

    public Map<String, Object> getStatistics() {
        List<Reservation> reservations = reservationRepository.findAll();

        long totalReservations = reservations.size();

        Map<String, Long> reservationsByDestination = reservations.stream()
                .collect(Collectors.groupingBy(Reservation::getDestination, Collectors.counting()));

        double averagePeople = reservations.stream()
                .mapToInt(Reservation::getNombrePersonnes)
                .average()
                .orElse(0.0);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalReservations", totalReservations);
        stats.put("reservationsByDestination", reservationsByDestination);
        stats.put("averagePeoplePerReservation", averagePeople);

        return stats;
    }

    public List<String> recommendDestinations(Long userId) {
        List<Reservation> userReservations = reservationRepository.findByUserId(userId);

        if (!userReservations.isEmpty()) {
            return userReservations.stream()
                    .collect(Collectors.groupingBy(Reservation::getDestination, Collectors.counting()))
                    .entrySet().stream()
                    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                    .map(Map.Entry::getKey)
                    .limit(3)
                    .collect(Collectors.toList());
        } else {
            return reservationRepository.findAll().stream()
                    .collect(Collectors.groupingBy(Reservation::getDestination, Collectors.counting()))
                    .entrySet().stream()
                    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                    .map(Map.Entry::getKey)
                    .limit(3)
                    .collect(Collectors.toList());
        }
    }

    public byte[] generateReservationTicket(Long reservationId) throws IOException, DocumentException, WriterException {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) throw new IllegalArgumentException("Reservation not found");

        ByteArrayOutputStream pdfOutput = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, pdfOutput);
        document.open();
        document.add(new Paragraph("🎟 Confirmation de Réservation"));
        document.add(new Paragraph("Nom de l'utilisateur : " + reservation.getUserId()));
        document.add(new Paragraph("Destination : " + reservation.getDestination()));
        document.add(new Paragraph("Date de départ : " + reservation.getDateDepart()));
        document.add(new Paragraph("Date de retour : " + reservation.getDateRetour()));

        String qrText = "Réservation #" + reservation.getId() + " pour " + reservation.getDestination();
        BitMatrix matrix = new MultiFormatWriter().encode(qrText, BarcodeFormat.QR_CODE, 200, 200);
        Path tempQR = Paths.get("qr_temp.png");
        MatrixToImageWriter.writeToPath(matrix, "PNG", tempQR);
        com.lowagie.text.Image qrImage = com.lowagie.text.Image.getInstance(Files.readAllBytes(tempQR));
        document.add(qrImage);
        document.close();
        Files.delete(tempQR);

        return pdfOutput.toByteArray();
    }

    // Liste d’options proposées
    public List<String> getAvailableOptionsForReservation(Long reservationId) {
        return List.of("Bagage supplémentaire", "Repas à bord", "Assurance voyage");
    }

    // Ajouter les options à une réservation
    public Reservation addOptionsToReservation(Long reservationId, List<String> options) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) throw new RuntimeException("Réservation non trouvée");

        reservation.getSelectedOptions().addAll(options);
        return reservationRepository.save(reservation);
    }

    // Récupérer les options sélectionnées d'une réservation
    public List<String> getSelectedOptions(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) throw new RuntimeException("Réservation non trouvée");

        return reservation.getSelectedOptions();
    }
}
