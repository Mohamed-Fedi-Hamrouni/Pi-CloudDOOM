package com.microservice.mentorshipservice.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.support.SessionStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "mentor_sessions")
public class MentorSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID requestId;
    private LocalDateTime scheduledAt;
    private String meetingLink;

    @Enumerated(EnumType.STRING)
    private SessionStatus status; // SCHEDULED, COMPLETED, CANCELLED
}
