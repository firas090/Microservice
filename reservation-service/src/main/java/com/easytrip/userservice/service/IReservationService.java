package com.easytrip.userservice.service;

import com.easytrip.userservice.models.Reservation;
import com.google.zxing.WriterException;
import com.lowagie.text.DocumentException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface IReservationService {

    List<Reservation> getAllReservations();

    Reservation getReservationById(Long id);

    Reservation createReservation(Reservation reservation);

    Reservation updateReservation(Long id, Reservation updated);

    void deleteReservation(Long id);

    // Nouvelle méthode pour récupérer la réservation + infos utilisateur
    Map<String, Object> getReservationWithUser(Long id);

    Map<String, Object> getStatistics();

    List<String> recommendDestinations(Long userId);


    public byte[] generateReservationTicket(Long reservationId) throws IOException, DocumentException, WriterException;
    List<String> getAvailableOptionsForReservation(Long id);


    Reservation addOptionsToReservation(Long id, List<String> options);
}
