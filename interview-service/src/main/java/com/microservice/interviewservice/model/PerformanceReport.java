package com.microservice.interviewservice.model;

import java.time.LocalDateTime;

import com.microservice.interviewservice.ennum.PreparationLevelEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "performance_reports")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PerformanceReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "session_id", nullable = false, unique = true)
    private InterviewSession session;

    private Double globalScore;
    private Double communicationScore;
    private Double contentQualityScore;
    private Double stressManagementScore;
    private Double confidenceScore;

    @Enumerated(EnumType.STRING)
    private PreparationLevelEnum preparationLevel;

    @Column(columnDefinition = "TEXT")
    private String topStrengths;

    @Column(columnDefinition = "TEXT")
    private String areasForImprovement;

    @Column(columnDefinition = "TEXT")
    private String actionableRecommendations;

    private Integer estimatedSessionsToNextLevel;

    @Column(nullable = false)
    private LocalDateTime generatedAt;

    @PrePersist
    protected void onCreate() {
        if (generatedAt == null) generatedAt = LocalDateTime.now();
    }
}