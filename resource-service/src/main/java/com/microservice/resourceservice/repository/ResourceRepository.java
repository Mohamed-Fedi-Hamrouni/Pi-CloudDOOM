package com.microservice.resourceservice.repository;

import com.microservice.resourceservice.enums.IndustryEnum;
import com.microservice.resourceservice.enums.ResourceLevelEnum;
import com.microservice.resourceservice.enums.ResourceTypeEnum;
import com.microservice.resourceservice.model.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, UUID> {

    Optional<Resource> findByUrl(String url);

    boolean existsByUrl(String url);

    Page<Resource> findByIndustry(IndustryEnum industry, Pageable pageable);

    Page<Resource> findByLevel(ResourceLevelEnum level, Pageable pageable);

    Page<Resource> findByType(ResourceTypeEnum type, Pageable pageable);

    Page<Resource> findByIndustryAndLevel(IndustryEnum industry, ResourceLevelEnum level, Pageable pageable);

    @Query("SELECT r FROM Resource r WHERE LOWER(r.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
        "OR LOWER(r.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Resource> searchByTitleOrDescription(@Param("query") String query, Pageable pageable);
}
