package com.microservice.trainingservice.controller;

import com.microservice.trainingservice.dto.AwardBadgeRequest;
import com.microservice.trainingservice.dto.CreateDailyActivityRequest;
import com.microservice.trainingservice.dto.CreateTrainingPathRequest;
import com.microservice.trainingservice.dto.DailyActivityResponse;
import com.microservice.trainingservice.dto.DebugBadgeSimulationRequest;
import com.microservice.trainingservice.dto.DebugBadgeSimulationResponse;
import com.microservice.trainingservice.dto.TrainingModuleResponse;
import com.microservice.trainingservice.dto.TrainingPathResponse;
import com.microservice.trainingservice.dto.UpdateModuleProgressRequest;
import com.microservice.trainingservice.dto.UserBadgeResponse;
import com.microservice.trainingservice.dto.UserXPTrackerResponse;
import com.microservice.trainingservice.service.TrainingGamificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/training")
@RequiredArgsConstructor
public class TrainingGamificationController {

    private final TrainingGamificationService trainingGamificationService;

    @PostMapping("/paths")
    @ResponseStatus(HttpStatus.CREATED)
    public TrainingPathResponse createPath(@Valid @RequestBody CreateTrainingPathRequest request) {
        return trainingGamificationService.createTrainingPath(request);
    }

    @GetMapping("/paths/user/{userId}")
    public TrainingPathResponse getPathByUserId(@PathVariable String userId) {
        return trainingGamificationService.getPathByUserId(userId);
    }

    @PutMapping("/paths/{pathId}/modules/{moduleId}")
    public TrainingModuleResponse updateModuleProgress(
        @PathVariable Long pathId,
        @PathVariable Long moduleId,
        @RequestParam("userId") String userId,
        @Valid @RequestBody UpdateModuleProgressRequest request
    ) {
        return trainingGamificationService.updateModuleProgress(userId, pathId, moduleId, request);
    }

    @PostMapping("/badges/award")
    @ResponseStatus(HttpStatus.CREATED)
    public UserBadgeResponse awardBadge(@Valid @RequestBody AwardBadgeRequest request) {
        return trainingGamificationService.awardBadge(request);
    }

    @PostMapping("/activities")
    public UserXPTrackerResponse recordDailyActivity(@Valid @RequestBody CreateDailyActivityRequest request) {
        return trainingGamificationService.recordDailyActivity(request);
    }

    @GetMapping("/activities/user/{userId}/today")
    public DailyActivityResponse getTodayActivity(@PathVariable String userId) {
        return trainingGamificationService.getTodayActivity(userId);
    }

    @GetMapping("/leaderboard")
    public List<UserXPTrackerResponse> getLeaderboard(@RequestParam(defaultValue = "10") int topN) {
        return trainingGamificationService.getLeaderboard(topN);
    }

    @PostMapping("/debug/badges/simulate")
    public DebugBadgeSimulationResponse simulateBadges(@RequestBody DebugBadgeSimulationRequest request) {
        return trainingGamificationService.simulateBadgeTriggersForQa(request);
    }
}
