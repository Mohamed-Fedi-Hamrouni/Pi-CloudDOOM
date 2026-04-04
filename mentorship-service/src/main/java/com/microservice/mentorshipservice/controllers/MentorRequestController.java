package com.microservice.mentorshipservice.controllers;

import com.microservice.mentorshipservice.DTOs.MentorRequestDTO;
import com.microservice.mentorshipservice.entities.MentorRequest;
import com.microservice.mentorshipservice.services.MentorRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/mentor-requests")
public class MentorRequestController {

    @Autowired
    private MentorRequestService service;

    // CREATE
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<MentorRequest> create(@RequestBody MentorRequestDTO dto) {
        return ResponseEntity.ok(service.createRequest(dto));
    }

    // READ
    @PreAuthorize("hasAnyRole('USER','MENTOR')")
    @GetMapping("/mentee/{id}")
    public List<MentorRequest> getByMentee(@PathVariable UUID id) {
        return service.getRequestsByMentee(id);
    }

    @PreAuthorize("hasAnyRole('USER','MENTOR')")
    @GetMapping("/mentor/{id}")
    public List<MentorRequest> getByMentor(@PathVariable UUID id) {
        return service.getRequestsByMentor(id);
    }

    // ACCEPT
    @PreAuthorize("hasRole('MENTOR')")
    @PutMapping("/{id}/accept")
    public MentorRequest accept(@PathVariable UUID id) {
        return service.acceptRequest(id);
    }

    // DECLINE
    @PreAuthorize("hasRole('MENTOR')")
    @PutMapping("/{id}/decline")
    public MentorRequest decline(@PathVariable UUID id) {
        return service.declineRequest(id);
    }

    // DELETE
    @PreAuthorize("hasAnyRole('USER','MENTOR')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.deleteRequest(id);
    }
}
