package com.microservice.mentorshipservice.controllers;

import com.microservice.mentorshipservice.DTOs.MentorRequestDTO;
import com.microservice.mentorshipservice.DTOs.MentorRequestResponseDTO;
import com.microservice.mentorshipservice.clients.UserServiceClient;
import com.microservice.mentorshipservice.services.MentorRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/mentor-requests")
public class MentorRequestController {

    @Autowired
    private MentorRequestService service;

    @Autowired
    private UserServiceClient userServiceClient;

    // CREATE
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ResponseEntity<MentorRequestResponseDTO> create(
            @RequestBody MentorRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        // Use user-service UUIDs for both mentorId and menteeId.
        // Authorization header is propagated to Feign via FeignClientInterceptor.
        UUID menteeId = userServiceClient.getCurrentUser().getId();
        return ResponseEntity.ok(service.createRequest(dto, menteeId));
    }

    // READ
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<MentorRequestResponseDTO> getAll() {
        return service.getAllRequests();
    }

    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_MENTOR')")
    @GetMapping("/mentee/{id}")
    public List<MentorRequestResponseDTO> getByMentee(@PathVariable UUID id) {  // return DTO not entity
        return service.getRequestsByMentee(id);
    }
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_MENTOR')")
    @GetMapping("/mentor/{id}")
    public List<MentorRequestResponseDTO> getByMentor(@PathVariable UUID id) {  // return DTO not entity
        return service.getRequestsByMentor(id);
    }
    // ACCEPT
    @PreAuthorize("hasRole('ROLE_MENTOR')")
    @PutMapping("/{id}/accept")
    public MentorRequestResponseDTO accept(@PathVariable UUID id) {             // return DTO not entity
        return service.acceptRequest(id);
    }
    // DECLINE
    @PreAuthorize("hasRole('ROLE_MENTOR')")
    @PutMapping("/{id}/decline")
    public MentorRequestResponseDTO decline(@PathVariable UUID id) {            // return DTO not entity
        return service.declineRequest(id);
    }

    // DELETE
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_MENTOR')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.deleteRequest(id);
    }


}
