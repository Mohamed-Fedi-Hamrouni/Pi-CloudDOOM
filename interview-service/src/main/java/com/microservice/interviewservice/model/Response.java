package com.microservice.interviewservice.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "responses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private InterviewSession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(columnDefinition = "TEXT")
    private String transcription;

    private String audioFileUrl;
    private String videoFileUrl;
    private Integer durationSeconds;
    private Integer wordCount;

    // null until scored server-side
    private Double overallScore;

    @Column(nullable = false)
    private LocalDateTime recordedAt;

    @PrePersist
    protected void onCreate() {
        if (recordedAt == null) recordedAt = LocalDateTime.now();
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    public Double getWordsPerMinute() {
        if (wordCount == null || durationSeconds == null || durationSeconds == 0) return null;
        return (wordCount / (durationSeconds / 60.0));
    }

    public boolean isComplete() {
        return overallScore != null && transcription != null && !transcription.isBlank();
    }
}