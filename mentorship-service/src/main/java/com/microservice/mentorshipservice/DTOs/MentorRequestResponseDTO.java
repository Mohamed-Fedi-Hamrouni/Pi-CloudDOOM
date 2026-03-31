package com.microservice.mentorshipservice.DTOs;

import java.util.UUID;

public class MentorRequestResponseDTO {
    public UUID id;
    public UUID mentorId;
    public UUID menteeId;
    public String status;
}