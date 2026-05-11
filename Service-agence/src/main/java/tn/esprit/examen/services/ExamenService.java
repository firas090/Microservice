package tn.esprit.examen.services;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tn.esprit.examen.controllers.UserClient;
import tn.esprit.examen.entities.Agence;
import tn.esprit.examen.entities.UserDTO;
import tn.esprit.examen.repositories.AgenceRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamenService implements IExamenService {

    private final AgenceRepository agenceRepository;
    private final UserClient userClient; // Remplace RestTemplate par UserClient

    @Override
    public Agence addAgence(Agence agence) {
        validateUserExists(agence.getResponsableId());
        // Assure-toi que l'ID n'est pas défini manuellement (MongoDB le génère)
        agence.setIdAgence(null);
        return agenceRepository.save(agence);
    }

    @Override
    public List<Agence> getAllAgences() {
        return agenceRepository.findAll();
    }

    @Override
    public Agence getAgenceById(String id) {
        return agenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agence non trouvée avec id: " + id));
    }

    @Override
    public Agence updateAgence(String id, Agence agence) {
        Agence existingAgence = getAgenceById(id);
        validateUserExists(agence.getResponsableId());
        // Mettre à jour les champs
        existingAgence.setNomAg(agence.getNomAg());
        existingAgence.setAdresse(agence.getAdresse());
        existingAgence.setEmail(agence.getEmail());
        existingAgence.setTelephone(agence.getTelephone());
        existingAgence.setSiteWeb(agence.getSiteWeb());
        existingAgence.setDescription(agence.getDescription());
        existingAgence.setActive(agence.isActive());
        existingAgence.setResponsableId(agence.getResponsableId());
        return agenceRepository.save(existingAgence);
    }

    @Override
    public void deleteAgence(String id) {
        if (!agenceRepository.existsById(id)) {
            throw new RuntimeException("Agence non trouvée avec id: " + id);
        }
        agenceRepository.deleteById(id);
    }

    private void validateUserExists(Long userId) {
        Boolean userExists = userClient.userExists(userId); // Utilise UserClient
        if (userExists == null || !userExists) {
            throw new RuntimeException("User non trouvé avec id: " + userId);
        }
    }

    @Override
    public List<Map<String, Object>> getAgencesWithResponsables() {
        List<Agence> agences = agenceRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Agence agence : agences) {
            Map<String, Object> map = new HashMap<>();
            map.put("agence", agence);
            UserDTO userData = fetchUserData(agence.getResponsableId()); // Utilise UserDTO
            if (userData != null) {
                map.put("responsable", userData);
            }
            response.add(map);
        }

        return response;
    }

    @Override
    public List<Agence> getAgencesByResponsableId(Long userId) {
        return agenceRepository.findAll()
                .stream()
                .filter(agence -> userId.equals(agence.getResponsableId()))
                .collect(Collectors.toList());
    }

    @Override
    public Agence toggleActiveStatus(String agenceId, boolean active) {
        Agence agence = agenceRepository.findById(agenceId)
                .orElseThrow(() -> new RuntimeException("Agence non trouvée"));

        agence.setActive(active);
        return agenceRepository.save(agence);
    }

    @Override
    public long getNombreAgencesParRole(String role) {
        List<Agence> agences = agenceRepository.findAll();
        long count = 0;

        for (Agence agence : agences) {
            Long userId = agence.getResponsableId();
            UserDTO userData = fetchUserData(userId); // Utilise UserDTO
            if (userData != null && role.equalsIgnoreCase(userData.getRole())) {
                count++;
            }
        }

        return count;
    }

    @Override
    public List<Agence> searchAgences(String nom, String adresse, Boolean active) {
        return agenceRepository.findAll()
                .stream()
                .filter(a -> (nom == null || a.getNomAg().toLowerCase().contains(nom.toLowerCase())))
                .filter(a -> (adresse == null || a.getAdresse().toLowerCase().contains(adresse.toLowerCase())))
                .filter(a -> (active == null || a.isActive() == active))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Object>> getTopResponsables(int limit) {
        List<Agence> agences = agenceRepository.findAll();

        Map<Long, Long> countMap = agences.stream()
                .collect(Collectors.groupingBy(Agence::getResponsableId, Collectors.counting()));

        return countMap.entrySet().stream()
                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
                .limit(limit)
                .map(entry -> {
                    Map<String, Object> result = new HashMap<>();
                    UserDTO userData = fetchUserData(entry.getKey()); // Utilise UserDTO
                    if (userData != null) {
                        result.put("user", userData);
                        result.put("nombreAgences", entry.getValue());
                    }
                    return result;
                })
                .filter(result -> !result.isEmpty())
                .collect(Collectors.toList());
    }

    @Override
    public String exportAgencesWithResponsablesCSV() throws IOException {
        List<Agence> agences = agenceRepository.findAll();

        StringWriter writer = new StringWriter();
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                .withHeader("Nom Agence", "Adresse", "Email Agence", "Responsable Nom", "Responsable Email", "Rôle"));

        for (Agence agence : agences) {
            UserDTO userData = fetchUserData(agence.getResponsableId()); // Utilise UserDTO
            if (userData != null) {
                String fullName = userData.getFirstname() + " " + userData.getLastname();
                csvPrinter.printRecord(
                        agence.getNomAg(),
                        agence.getAdresse(),
                        agence.getEmail(),
                        fullName,
                        userData.getEmail(),
                        userData.getRole()
                );
            }
        }

        csvPrinter.flush();
        return writer.toString();
    }

    @Override
    public Map<String, Map<String, Long>> getStatistiquesParVilleEtStatut() {
        List<Agence> agences = agenceRepository.findAll();

        Map<String, Map<String, Long>> result = new HashMap<>();

        for (Agence agence : agences) {
            String ville = agence.getAdresse();
            boolean active = agence.isActive();

            result.putIfAbsent(ville, new HashMap<>());
            Map<String, Long> statsVille = result.get(ville);

            if (active) {
                statsVille.put("actives", statsVille.getOrDefault("actives", 0L) + 1);
            } else {
                statsVille.put("inactives", statsVille.getOrDefault("inactives", 0L) + 1);
            }
        }

        return result;
    }

    @Override
    public Map<String, Double> getTauxDisponibiliteParVille() {
        List<Agence> agences = agenceRepository.findAll();
        Map<String, List<Agence>> agencesParVille = agences.stream()
                .collect(Collectors.groupingBy(Agence::getAdresse));

        Map<String, Double> tauxParVille = new HashMap<>();

        for (Map.Entry<String, List<Agence>> entry : agencesParVille.entrySet()) {
            String ville = entry.getKey();
            List<Agence> agencesDansVille = entry.getValue();

            long total = agencesDansVille.size();
            long actives = agencesDansVille.stream().filter(Agence::isActive).count();

            double taux = total == 0 ? 0.0 : (actives * 100.0) / total;
            tauxParVille.put(ville, taux);
        }

        return tauxParVille;
    }

    @Override
    public Map<String, Object> comparerResponsables(Long userId1, Long userId2) {
        Map<String, Object> result = new HashMap<>();

        List<Agence> agences1 = agenceRepository.findAll().stream()
                .filter(a -> userId1.equals(a.getResponsableId())).toList();
        List<Agence> agences2 = agenceRepository.findAll().stream()
                .filter(a -> userId2.equals(a.getResponsableId())).toList();

        long total1 = agences1.size();
        long total2 = agences2.size();
        long actives1 = agences1.stream().filter(Agence::isActive).count();
        long actives2 = agences2.stream().filter(Agence::isActive).count();

        double taux1 = total1 == 0 ? 0.0 : (actives1 * 100.0) / total1;
        double taux2 = total2 == 0 ? 0.0 : (actives2 * 100.0) / total2;

        result.put("user1", Map.of(
                "userId", userId1,
                "nombreAgences", total1,
                "tauxDisponibilite", taux1
        ));
        result.put("user2", Map.of(
                "userId", userId2,
                "nombreAgences", total2,
                "tauxDisponibilite", taux2
        ));

        return result;
    }
//1
    @Override
    public byte[] generateActiveAgencesPdf() throws IOException {
        List<Agence> agences = agenceRepository.findAll().stream()
                .filter(Agence::isActive)
                .toList();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("Liste des agences actives").setBold().setFontSize(18).setMarginBottom(10));

        Table table = new Table(UnitValue.createPercentArray(new float[]{3, 3, 3, 4}));
        table.setWidth(UnitValue.createPercentValue(100));

        table.addHeaderCell(new Cell().add(new Paragraph("Nom agence").setBold()));
        table.addHeaderCell(new Cell().add(new Paragraph("Adresse").setBold()));
        table.addHeaderCell(new Cell().add(new Paragraph("Responsable").setBold()));
        table.addHeaderCell(new Cell().add(new Paragraph("Email responsable").setBold()));

        for (Agence agence : agences) {
            UserDTO userData = fetchUserData(agence.getResponsableId()); // Utilise UserDTO
            String fullName = userData != null ? userData.getFirstname() + " " + userData.getLastname() : "N/A";
            String email = userData != null ? userData.getEmail() : "N/A";
            table.addCell(agence.getNomAg());
            table.addCell(agence.getAdresse());
            table.addCell(fullName);
            table.addCell(email);
        }

        document.add(table);
        document.close();

        return out.toByteArray();
    }

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void envoyerAgencesParEmail(String destinataire) throws IOException, MessagingException {
        List<Agence> agences = agenceRepository.findAll();

        StringWriter writer = new StringWriter();
        CSVPrinter csv = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("Agence", "Adresse", "Responsable"));

        for (Agence agence : agences) {
            UserDTO userData = fetchUserData(agence.getResponsableId()); // Utilise UserDTO
            String fullName = userData != null ? userData.getFirstname() + " " + userData.getLastname() : "N/A";
            csv.printRecord(agence.getNomAg(), agence.getAdresse(), fullName);
        }

        csv.flush();
        byte[] attachmentData = writer.toString().getBytes(StandardCharsets.UTF_8);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(destinataire);
        helper.setSubject("Liste des agences");
        helper.setText("Veuillez trouver en pièce jointe la liste des agences.", true);
        helper.addAttachment("agences.csv", new ByteArrayResource(attachmentData));

        mailSender.send(message);
    }

    private UserDTO fetchUserData(Long userId) {
        try {
            return userClient.getUserById(userId);
        } catch (Exception e) {
            return null;
        }
    }
}