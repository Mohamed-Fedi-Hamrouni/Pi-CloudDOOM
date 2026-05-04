package com.interviewprep.community_service.repository;

import com.interviewprep.community_service.model.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerKeycloakIdAndFollowingKeycloakId(String followerKeycloakId, String followingKeycloakId);
    List<Follow> findByFollowingKeycloakId(String followingKeycloakId);
    List<Follow> findByFollowerKeycloakId(String followerKeycloakId);
    boolean existsByFollowerKeycloakIdAndFollowingKeycloakId(String followerKeycloakId, String followingKeycloakId);

    Page<Follow> findByFollowingKeycloakId(String followingKeycloakId, Pageable pageable);
    Page<Follow> findByFollowerKeycloakId(String followerKeycloakId, Pageable pageable);

    long countByFollowingKeycloakId(String followingKeycloakId);
    long countByFollowerKeycloakId(String followerKeycloakId);
}
