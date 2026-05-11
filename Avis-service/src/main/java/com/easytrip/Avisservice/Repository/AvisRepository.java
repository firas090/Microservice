package com.easytrip.Avisservice.Repository;

import com.easytrip.Avisservice.models.Avis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AvisRepository extends JpaRepository<Avis, Long> {
    List<Avis> findByVoyageId(Long voyageId);
    List<Avis> findByUtilisateurId(Long utilisateurId);

    @Query("SELECT a FROM Avis a WHERE " +
            "(LOWER(a.commentaire) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "CAST(a.note AS string) LIKE %:keyword%) " +
            "AND (:voyageId IS NULL OR a.voyageId = :voyageId) " +
            "AND (:approuve IS NULL OR a.approuve = :approuve)")
    List<Avis> searchAvis(@Param("keyword") String keyword,
                          @Param("voyageId") Long voyageId,
                          @Param("approuve") Boolean approuve);
}
