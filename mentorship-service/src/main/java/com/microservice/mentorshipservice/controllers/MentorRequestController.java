package com.microservice.mentorshipservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/mentor-requests")
public class MentorRequestController {

    @Autowired
    private MentorRequestService service;

    // CREATE
    @PostMapping
    public ResponseEntity<MentorRequest> create(@RequestBody MentorRequestDTO dto) {
        return ResponseEntity.ok(service.createRequest(dto));
    }

    // READ
    @GetMapping("/mentee/{id}")
    public List<MentorRequest> getByMentee(@PathVariable UUID id) {
        return service.getRequestsByMentee(id);
    }

    // ACCEPT
    @PutMapping("/{id}/accept")
    public MentorRequest accept(@PathVariable UUID id) {
        return service.acceptRequest(id);
    }

    // DECLINE
    @PutMapping("/{id}/decline")
    public MentorRequest decline(@PathVariable UUID id) {
        return service.declineRequest(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.deleteRequest(id);
    }
}
