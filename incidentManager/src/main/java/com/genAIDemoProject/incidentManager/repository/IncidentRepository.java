package com.genAIDemoProject.incidentManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.genAIDemoProject.incidentManager.model.Incident;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
	

    @Query(value = "SELECT id, text FROM incident ORDER BY embedding <-> CAST(:embedding AS vector) LIMIT :limit",
           nativeQuery = true)
    List<Incident> findSimilarIncident(@Param("embedding") String embedding, @Param("limit") int limit);

}
