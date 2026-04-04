package com.microservice.mentorshipservice.services;

import com.microservice.mentorshipservice.DTOs.MentorRequestDTO;
import com.microservice.mentorshipservice.DTOs.UserResponse;
import com.microservice.mentorshipservice.clients.UserServiceClient;
import com.microservice.mentorshipservice.entities.MentorRequest;
import com.microservice.mentorshipservice.enums.MentorStatus;
import com.microservice.mentorshipservice.repository.MentorRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MentorRequestService {

    @Autowired
    private MentorRequestRepository repository;

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private MentorSessionService sessionService;

    // CREATE
    public MentorRequest createRequest(MentorRequestDTO dto) {
        // Validate that mentee and mentor exist
        try {
            UserResponse mentee = userServiceClient.getUserById(dto.menteeId);
            UserResponse mentor = userServiceClient.getUserById(dto.mentorId);
        } catch (Exception e) {
            throw new RuntimeException("Invalid user ID: " + e.getMessage());
        }

        // Prevent self-requests
        if (dto.menteeId.equals(dto.mentorId)) {
            throw new RuntimeException("Cannot request mentorship from yourself");
        }

        MentorRequest request = new MentorRequest();
        request.setMentorId(dto.mentorId);
        request.setMenteeId(dto.menteeId);
        request.setStatus(MentorStatus.PENDING);
        request.setCreatedAt(LocalDateTime.now());
    boolean exists = repository.findByMenteeId(dto.menteeId)
    .stream()
    .anyMatch(r -> r.getMentorId().equals(dto.mentorId)
        && r.getStatus() == MentorStatus.PENDING);

if (exists) {
    throw new RuntimeException("Request already exists");
}

        return repository.save(request);
    }

    // READ
    public List<MentorRequest> getRequestsByMentee(UUID menteeId) {
        return repository.findByMenteeId(menteeId);
    }

    public List<MentorRequest> getRequestsByMentor(UUID mentorId) {
        return repository.findByMentorId(mentorId);
    }

    // UPDATE (ACCEPT)
    public MentorRequest acceptRequest(UUID id) {
        MentorRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (request.getStatus() != MentorStatus.PENDING) {
            throw new RuntimeException("Request is not in pending status");
        }

        request.setStatus(MentorStatus.ACCEPTED);
        MentorRequest savedRequest = repository.save(request);

        // Create a default session (mentor can update later)
        try {
            sessionService.createSession(
                id,
                LocalDateTime.now().plusDays(7), // Default: 1 week from now
                "TBD" // To be determined
            );
        } catch (Exception e) {
            // Log but don't fail the request acceptance
            System.err.println("Failed to create default session: " + e.getMessage());
        }

        return savedRequest;
    }

    // UPDATE (DECLINE)
    public MentorRequest declineRequest(UUID id) {
        MentorRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (request.getStatus() != MentorStatus.PENDING) {
            throw new RuntimeException("Request is not in pending status");
        }

        request.setStatus(MentorStatus.DECLINED);
        return repository.save(request);
    }

    // DELETE
    public void deleteRequest(UUID id) {
        repository.deleteById(id);
    }
}
