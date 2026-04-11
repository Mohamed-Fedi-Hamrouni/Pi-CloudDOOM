package com.microservice.mentorshipservice.controllers;

import com.microservice.mentorshipservice.DTOs.MentorStatsDTO;
import com.microservice.mentorshipservice.DTOs.RatingRequestDTO;
import com.microservice.mentorshipservice.entities.MentorRating;
import com.microservice.mentorshipservice.services.MentorRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/mentor-ratings")
public class MentorRatingController {

    @Autowired
    private MentorRatingService service;

    // GET stats for a mentor (public — anyone authenticated)
    @GetMapping("/mentor/{mentorId}/stats")
    public ResponseEntity<MentorStatsDTO> getStats(@PathVariable UUID mentorId) {
        return ResponseEntity.ok(service.getMentorStats(mentorId));
    }

    // POST a rating (only USER role, after completed session)
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/mentor/{mentorId}")
    public ResponseEntity<MentorRating> rate(
            @PathVariable UUID mentorId,
            @RequestBody RatingRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        UUID menteeId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.ok(service.rateMentor(menteeId, mentorId, dto));
    }
}