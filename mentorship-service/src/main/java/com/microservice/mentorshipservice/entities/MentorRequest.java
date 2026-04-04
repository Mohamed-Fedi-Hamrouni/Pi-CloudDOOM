package com.microservice.mentorshipservice.entities;

import com.microservice.mentorshipservice.enums.MentorStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "mentor_requests")
public class MentorRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID menteeId;
    private UUID mentorId;

    @Enumerated(EnumType.STRING)
    private MentorStatus status;

    private LocalDateTime createdAt;
}
