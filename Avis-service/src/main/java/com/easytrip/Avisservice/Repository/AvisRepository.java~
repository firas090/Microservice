package com.easytrip.Avisservice.Repository;

import com.easytrip.Avisservice.models.Avis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvisRepository extends JpaRepository<Avis, Long> {
    List<Avis> findByVoyageId(Long voyageId);
    List<Avis> findByUtilisateurId(Long utilisateurId);
}
