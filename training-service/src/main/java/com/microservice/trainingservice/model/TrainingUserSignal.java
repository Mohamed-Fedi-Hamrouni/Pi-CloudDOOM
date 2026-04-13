package com.microservice.trainingservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "training_user_signals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingUserSignal {

    @Id
    @Column(name = "user_id", nullable = false, updatable = false)
    private String userId;

    @Column(name = "last_session_id")
    private Long lastSessionId;

    @Column(name = "session_type", length = 80)
    private String sessionType;

    @Column(name = "global_score")
    private Double globalScore;

    @Column(name = "preparation_level", length = 80)
    private String preparationLevel;

    @Column(name = "total_sessions_completed")
    private Integer totalSessionsCompleted;

    @Column(name = "event_generated_at", length = 80)
    private String eventGeneratedAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
