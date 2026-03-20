package com.microservice.userservice.service;

import com.microservice.userservice.dto.CreateUserRequest;
import com.microservice.userservice.dto.UpdateUserRequest;
import com.microservice.userservice.dto.UserResponse;
import com.microservice.userservice.enums.RoleEnum;
import com.microservice.userservice.enums.UserStatus;
import com.microservice.userservice.exception.UserAlreadyExistsException;
import com.microservice.userservice.exception.UserNotFoundException;
import com.microservice.userservice.mapper.UserMapper;
import com.microservice.userservice.model.User;
import com.microservice.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        log.info("User created successfully with id: {}", saved.getId());

        return userMapper.toResponse(saved);
    }

    // ── READ ──────────────────────────────────────────────────────────────────

    public UserResponse findById(UUID id) {
        return userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .map(userMapper::toResponse)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));
    }

    public UserResponse findByKeycloakId(String keycloakId) {
        return userRepository.findByKeycloakId(keycloakId)
            .filter(u -> u.getDeletedAt() == null)
            .map(userMapper::toResponse)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with keycloakId: " + keycloakId));
    }

    public UserResponse findByEmail(String email) {
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
    public UserResponse update(UUID id, UpdateUserRequest request) {
        log.info("Updating user with id: {}", id);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        userMapper.updateEntity(request, user);
        User saved = userRepository.save(user);

        log.info("User updated successfully with id: {}", saved.getId());
        return userMapper.toResponse(saved);
    }

    @Transactional
    public UserResponse updateRole(UUID id, RoleEnum newRole) {
        log.info("Updating role for user id: {} to {}", id, newRole);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        user.setRole(newRole);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Transactional
    public UserResponse updateStatus(UUID id, UserStatus newStatus) {
        log.info("Updating status for user id: {} to {}", id, newStatus);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        user.setStatus(newStatus);
        return userMapper.toResponse(userRepository.save(user));
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
    public void delete(UUID id) {
        log.info("Soft deleting user with id: {}", id);

        User user = userRepository.findById(id)
            .filter(u -> u.getDeletedAt() == null)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with id: " + id));

        user.setDeletedAt(LocalDateTime.now());
        user.setStatus(UserStatus.DELETED);
        userRepository.save(user);

        log.info("User soft deleted successfully with id: {}", id);
    }
}
