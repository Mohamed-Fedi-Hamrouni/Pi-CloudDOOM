package com.microservice.userservice.service;

import com.microservice.userservice.dto.CreateUserRequest;
import com.microservice.userservice.dto.UpdateUserRequest;
import com.microservice.userservice.dto.UserResponse;
import com.microservice.userservice.enums.RoleEnum;
import com.microservice.userservice.enums.UserStatus;
import com.microservice.userservice.exception.UserAlreadyExistsException;
import com.microservice.userservice.exception.UserNotFoundException;
import com.microservice.userservice.mapper.UserMapper;
import com.microservice.userservice.messaging.producer.UserEventProducer;
import com.microservice.userservice.model.User;
import com.microservice.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserEventProducer eventProducer;

    // ── CREATE ────────────────────────────────────────────────────────────────

    @Transactional
    public UserResponse create(CreateUserRequest request, String keycloakId) {
        log.info("Creating user with email: {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException(
                "User with email " + request.getEmail() + " already exists");
        }

        if (userRepository.existsByKeycloakId(keycloakId)) {
            throw new UserAlreadyExistsException(
                "User with keycloakId " + keycloakId + " already exists");
        }

        User user = userMapper.toEntity(request);
        user.setKeycloakId(keycloakId);
        user.setRole(RoleEnum.USER);
        user.setStatus(UserStatus.PENDING_VERIFICATION);

        User saved = userRepository.save(user);
        eventProducer.publishUserCreated(saved);

        log.info("User created successfully with id: {}", saved.getId());
        return userMapper.toResponse(saved);
    }

    // ── READ ──────────────────────────────────────────────────────────────────

    @Cacheable(value = "users", key = "#id")
    public UserResponse findById(UUID id) {
        log.info("Cache MISS - fetching user from DB with id: {}", id);
        return userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .map(userMapper::toResponse)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));
    }

    @Cacheable(value = "users-by-keycloak", key = "#keycloakId")
    public UserResponse findByKeycloakId(String keycloakId) {
        log.info("Cache MISS - fetching user from DB with keycloakId: {}", keycloakId);
        return userRepository.findByKeycloakId(keycloakId)
            .filter(u -> u.getDeletedAt() == null)
            .map(userMapper::toResponse)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with keycloakId: " + keycloakId));
    }

    @Cacheable(value = "users-by-email", key = "#email")
    public UserResponse findByEmail(String email) {
        log.info("Cache MISS - fetching user from DB with email: {}", email);
        return userRepository.findByEmail(email)
            .filter(u -> u.getDeletedAt() == null)
            .map(userMapper::toResponse)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with email: " + email));
    }

    public Page<UserResponse> findAll(Pageable pageable) {
        return userRepository.findByDeletedAtIsNull(pageable)
            .map(userMapper::toResponse);
    }

    public Page<UserResponse> search(String query, Pageable pageable) {
        return userRepository.searchUsers(query, pageable)
            .map(userMapper::toResponse);
    }

    public Page<UserResponse> findByStatus(UserStatus status, Pageable pageable) {
        return userRepository.findByStatusAndDeletedAtIsNull(status, pageable)
            .map(userMapper::toResponse);
    }

    public Page<UserResponse> findByRole(RoleEnum role, Pageable pageable) {
        return userRepository.findByRoleAndDeletedAtIsNull(role, pageable)
            .map(userMapper::toResponse);
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    @Transactional
    @Caching(
        put = { @CachePut(value = "users", key = "#id") },
        evict = {
            @CacheEvict(value = "users-by-keycloak", allEntries = true),
            @CacheEvict(value = "users-by-email", allEntries = true)
        }
    )
    public UserResponse update(UUID id, UpdateUserRequest request) {
        log.info("Updating user with id: {}", id);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        userMapper.updateEntity(request, user);
        User saved = userRepository.save(user);
        eventProducer.publishUserUpdated(saved);

        log.info("User updated successfully with id: {}", saved.getId());
        return userMapper.toResponse(saved);
    }

    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "users", key = "#id"),
        @CacheEvict(value = "users-by-keycloak", allEntries = true),
        @CacheEvict(value = "users-by-email", allEntries = true)
    })
    public UserResponse updateRole(UUID id, RoleEnum newRole) {
        log.info("Updating role for user id: {} to {}", id, newRole);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        user.setRole(newRole);
        User saved = userRepository.save(user);
        eventProducer.publishUserRoleChanged(saved);

        return userMapper.toResponse(saved);
    }

    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "users", key = "#id"),
        @CacheEvict(value = "users-by-keycloak", allEntries = true),
        @CacheEvict(value = "users-by-email", allEntries = true)
    })
    public UserResponse updateStatus(UUID id, UserStatus newStatus) {
        log.info("Updating status for user id: {} to {}", id, newStatus);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        user.setStatus(newStatus);
        User saved = userRepository.save(user);

        if (newStatus == UserStatus.SUSPENDED) {
            eventProducer.publishUserSuspended(saved);
        } else if (newStatus == UserStatus.ACTIVE && saved.getIsVerified()) {
            eventProducer.publishUserVerified(saved);
        }

        return userMapper.toResponse(saved);
    }

    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "users", key = "#id"),
        @CacheEvict(value = "users-by-keycloak", allEntries = true),
        @CacheEvict(value = "users-by-email", allEntries = true)
    })
    public UserResponse verifyUser(UUID id) {
        log.info("Verifying user with id: {}", id);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        user.setIsVerified(true);
        user.setStatus(UserStatus.ACTIVE);
        User saved = userRepository.save(user);
        eventProducer.publishUserVerified(saved);

        return userMapper.toResponse(saved);
    }

    @Transactional
    public void updateLastLogin(String keycloakId) {
        userRepository.findByKeycloakId(keycloakId).ifPresent(user -> {
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);
        });
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "users", key = "#id"),
        @CacheEvict(value = "users-by-keycloak", allEntries = true),
        @CacheEvict(value = "users-by-email", allEntries = true)
    })
    public void delete(UUID id) {
        log.info("Soft deleting user with id: {}", id);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        user.setDeletedAt(LocalDateTime.now());
        user.setStatus(UserStatus.DELETED);
        User saved = userRepository.save(user);
        eventProducer.publishUserDeleted(saved);

        log.info("User soft deleted successfully with id: {}", id);
    }
}