package com.microservice.mentorshipservice.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.microservice.mentorshipservice.enums.SessionStatus;

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
    private SessionStatus status;
}
