package com.microservice.mentorshipservice.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class MentorRequestDTO {
    public UUID mentorId;
}
