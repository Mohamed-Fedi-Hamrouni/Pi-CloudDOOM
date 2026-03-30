package com.microservice.trainingservice.repository;

import com.microservice.trainingservice.model.TrainingPath;
import com.microservice.trainingservice.model.PathStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface TrainingPathRepository extends JpaRepository<TrainingPath, Long> {
    
    Optional<TrainingPath> findByUserId(String userId);
    
    @Query("SELECT tp FROM TrainingPath tp LEFT JOIN FETCH tp.modules WHERE tp.userId = :userId")
    Optional<TrainingPath> findByUserIdEagerModules(@Param("userId") String userId);
    
    @Query("SELECT tp FROM TrainingPath tp WHERE tp.status = :status")
    List<TrainingPath> findByStatus(@Param("status") PathStatus status);
    
    @Query(value = "SELECT tp.* FROM training_paths tp WHERE tp.xp_threshold > :minXp AND tp.status = 'ACTIVE'", 
           nativeQuery = true)
    List<TrainingPath> findAdvancedPathsByMinXp(@Param("minXp") Integer minXp);
    
    long countByStatus(PathStatus status);
}
