package com.microservice.userservice.dto;

import com.microservice.userservice.enums.IndustryEnum;
import com.microservice.userservice.enums.PlanEnum;
import com.microservice.userservice.enums.RoleEnum;
import com.microservice.userservice.enums.UserStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class UserResponse {

    private UUID id;
    private String email;
    private RoleEnum role;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String city;
    private String bio;
    private String avatarUrl;
    private Integer karmaPoints;
    private Boolean isVerified;
    private UserStatus status;
    private PlanEnum plan;
    private Integer simulationsUsedThisMonth;
    private Integer simulationsLimit;
    private Boolean subscriptionActive;
    private LocalDateTime subscriptionStart;
    private LocalDateTime subscriptionEnd;
    private String preferredLanguage;
    private Boolean emailNotificationsEnabled;
    private Boolean pushNotificationsEnabled;
    private Boolean profileVisible;
    private IndustryEnum preferredIndustry;
    private String experiencesJson;
    private String educationsJson;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
