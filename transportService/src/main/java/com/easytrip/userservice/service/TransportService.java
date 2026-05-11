package com.easytrip.userservice.service;

import com.easytrip.userservice.Repository.TransportRepository;
import com.easytrip.userservice.feign.UserClient;
import com.easytrip.userservice.models.Transport;
import com.easytrip.userservice.models.TransportWithUserDTO;
import com.easytrip.userservice.models.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransportService implements ITransportService {

    @Autowired
    private TransportRepository transportRepository;

    @Autowired
    private UserClient userClient;

    @Override
    public List<Transport> getAllTransports() {
        return transportRepository.findAll();
    }

    @Override
    public Transport getTransportById(String id) {
        return transportRepository.findById(id).orElse(null);
    }

    @Override
    public Transport createTransport(Transport transport) {
        try {
            UserDTO user = userClient.getUserById(transport.getUserId());
            if (user == null) {
                throw new RuntimeException("User not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("User ID invalide ou introuvable");
        }
        return transportRepository.save(transport);
    }

    @Override
    public Transport updateTransport(String id, Transport updated) {
        Transport existing = transportRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setType(updated.getType());
            existing.setCompagnie(updated.getCompagnie());
            existing.setCapacite(updated.getCapacite());
            existing.setNumero(updated.getNumero());
            existing.setVilleDepart(updated.getVilleDepart());
            existing.setVilleArrivee(updated.getVilleArrivee());
            existing.setDateDepart(updated.getDateDepart());
            existing.setDateArrivee(updated.getDateArrivee());
            existing.setPrix(updated.getPrix());
            existing.setVoyageId(updated.getVoyageId());
            existing.setUserId(updated.getUserId());
            return transportRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteTransport(String id) {
        transportRepository.deleteById(id);
    }

    @Override
    public List<Transport> getTransportsByUserId(Long userId) {
        return transportRepository.findByUserId(userId);
    }
    // 🚀 Méthode avancée : retourne le transport + l'utilisateur associé
    public TransportWithUserDTO getTransportWithUserDetails(String transportId) {
        Transport transport = transportRepository.findById(transportId)
                .orElseThrow(() -> new RuntimeException("Transport not found"));

        UserDTO user;
        try {
            user = userClient.getUserById(transport.getUserId());
        } catch (Exception e) {
            throw new RuntimeException("Impossible de récupérer l'utilisateur associé");
        }

        TransportWithUserDTO dto = new TransportWithUserDTO();
        dto.setId(transport.getId());
        dto.setVoyageId(transport.getVoyageId());
        dto.setType(transport.getType());
        dto.setCompagnie(transport.getCompagnie());
        dto.setCapacite(transport.getCapacite());
        dto.setNumero(transport.getNumero());
        dto.setVilleDepart(transport.getVilleDepart());
        dto.setVilleArrivee(transport.getVilleArrivee());
        dto.setDateDepart(transport.getDateDepart());
        dto.setDateArrivee(transport.getDateArrivee());
        dto.setPrix(transport.getPrix());
        dto.setUser(user);

        return dto;
    }

}
