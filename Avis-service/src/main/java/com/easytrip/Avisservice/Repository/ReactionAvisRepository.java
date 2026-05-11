package com.easytrip.Avisservice.Repository;

import com.easytrip.Avisservice.models.ReactionAvis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReactionAvisRepository extends JpaRepository<ReactionAvis, Long> {
    List<ReactionAvis> findByAvisId(Long avisId);
    boolean existsByAvisIdAndUserId(Long avisId, Long userId);
}
