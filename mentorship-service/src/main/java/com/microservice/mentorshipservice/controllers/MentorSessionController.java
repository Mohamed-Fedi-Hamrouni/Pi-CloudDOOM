package com.microservice.mentorshipservice.controllers;

import com.microservice.mentorshipservice.DTOs.MentorSessionDTO;
import com.microservice.mentorshipservice.entities.MentorSession;
import com.microservice.mentorshipservice.services.MentorSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/mentor-sessions")
public class MentorSessionController {

    @Autowired
    private MentorSessionService service;

    // CREATE
    @PreAuthorize("hasRole('MENTOR')")          // ADD
    @PostMapping
    public ResponseEntity<MentorSession> create(@RequestBody MentorSessionDTO dto) {
        MentorSession session = service.createSession(
                dto.getRequestId(), dto.getScheduledAt(), dto.getMeetingLink());
        return ResponseEntity.ok(session);
    }

    // READ
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<MentorSession> getAll() {
        return service.getAllSessions();
    }

    @PreAuthorize("hasAnyRole('USER','MENTOR')") // ADD
    @GetMapping("/request/{requestId}")
    public List<MentorSession> getByRequest(@PathVariable UUID requestId) {
        return service.getSessionsByRequest(requestId);
    }

    // UPDATE (COMPLETE)
    @PreAuthorize("hasRole('MENTOR')")           // ADD
    @PutMapping("/{id}/complete")
    public MentorSession complete(@PathVariable UUID id) {
        return service.completeSession(id);
    }

    // UPDATE (CANCEL)
    @PreAuthorize("hasAnyRole('USER','MENTOR')") // ADD — either party can cancel
    @PutMapping("/{id}/cancel")
    public MentorSession cancel(@PathVariable UUID id) {
        return service.cancelSession(id);
    }
}