package tn.esprit.examen.services;

import tn.esprit.examen.entities.Agence;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface IExamenService {

    Agence addAgence(Agence agence);

    List<Agence> getAllAgences();

    Agence getAgenceById(String id);

    Agence updateAgence(String id, Agence agence);

    void deleteAgence(String id);

    List<Map<String, Object>> getAgencesWithResponsables();

    List<Agence> getAgencesByResponsableId(Long userId);

    Agence toggleActiveStatus(String agenceId, boolean active);

    long getNombreAgencesParRole(String role);

    List<Agence> searchAgences(String nom, String adresse, Boolean active);

    List<Map<String, Object>> getTopResponsables(int limit);

    String exportAgencesWithResponsablesCSV() throws IOException;

    Map<String, Map<String, Long>> getStatistiquesParVilleEtStatut();

    Map<String, Double> getTauxDisponibiliteParVille();

    Map<String, Object> comparerResponsables(Long userId1, Long userId2);

    byte[] generateActiveAgencesPdf() throws IOException;

    void envoyerAgencesParEmail(String destinataire) throws IOException, MessagingException;
}