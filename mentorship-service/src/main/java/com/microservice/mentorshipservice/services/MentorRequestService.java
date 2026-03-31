package com.microservice.mentorshipservice.services;

import com.microservice.mentorshipservice.DTOs.MentorRequestDTO;
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

    // CREATE
    public MentorRequest createRequest(MentorRequestDTO dto) {
        MentorRequest request = new MentorRequest();
        request.setMentorId(dto.mentorId);
        request.setMenteeId(dto.menteeId);
        request.setStatus(MentorStatus.PENDING);
        request.setCreatedAt(LocalDateTime.now());

        return repository.save(request);
    }

    // READ
    public List<MentorRequest> getRequestsByMentee(UUID menteeId) {
        return repository.findByMenteeId(menteeId);
    }

    // UPDATE (ACCEPT)
    public MentorRequest acceptRequest(UUID id) {
        MentorRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(MentorStatus.ACCEPTED);
        return repository.save(request);
    }

    // UPDATE (DECLINE)
    public MentorRequest declineRequest(UUID id) {
        MentorRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(MentorStatus.DECLINED);
        return repository.save(request);
    }

    // DELETE
    public void deleteRequest(UUID id) {
        repository.deleteById(id);
    }
}
