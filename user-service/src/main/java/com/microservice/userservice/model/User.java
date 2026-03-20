package com.microservice.userservice.model;

import com.microservice.userservice.enums.IndustryEnum;
import com.microservice.userservice.enums.PlanEnum;
import com.microservice.userservice.enums.RoleEnum;
import com.microservice.userservice.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String keycloakId;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleEnum role;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String city;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String avatarUrl;

    @Column(nullable = false)
    @Builder.Default
    private Integer karmaPoints = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isVerified = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private UserStatus status = UserStatus.PENDING_VERIFICATION;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private PlanEnum plan = PlanEnum.FREE;

    @Column(nullable = false)
    @Builder.Default
    private Integer simulationsUsedThisMonth = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer simulationsLimit = 3;

    @Column(nullable = false)
    @Builder.Default
    private Boolean subscriptionActive = false;

    private LocalDateTime subscriptionStart;
    private LocalDateTime subscriptionEnd;

    @Builder.Default
    private String preferredLanguage = "fr";

    @Column(nullable = false)
    @Builder.Default
    private Boolean emailNotificationsEnabled = true;

    @Column(nullable = false)
    @Builder.Default
    private Boolean pushNotificationsEnabled = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean profileVisible = true;

    @Enumerated(EnumType.STRING)
    private IndustryEnum preferredIndustry;

    @Column(columnDefinition = "TEXT")
    private String experiencesJson;

    @Column(columnDefinition = "TEXT")
    private String educationsJson;

    private LocalDateTime lastLoginAt;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;
}
