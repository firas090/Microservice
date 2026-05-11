package com.easytrip.Avisservice.service;
import com.easytrip.Avisservice.models.Avis;
import java.util.List;

public interface IAvisService {

    Avis createAvis(Avis avis);

    Avis getAvisById(Long id);

    List<Avis> getAllAvis();

    List<Avis> getAvisByVoyageId(Long voyageId);

    List<Avis> getAvisByUtilisateurId(Long utilisateurId);

    Avis updateAvis(Long id, Avis updatedAvis);

    void deleteAvis(Long id);
}
