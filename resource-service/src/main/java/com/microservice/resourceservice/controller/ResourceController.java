package com.microservice.resourceservice.controller;

import com.microservice.resourceservice.dto.ResourceCategoryRequest;
import com.microservice.resourceservice.dto.ResourceCategoryResponse;
import com.microservice.resourceservice.dto.ResourceRequest;
import com.microservice.resourceservice.dto.ResourceResponse;
import com.microservice.resourceservice.dto.UserBookmarkResponse;
import com.microservice.resourceservice.enums.IndustryEnum;
import com.microservice.resourceservice.enums.ResourceLevelEnum;
import com.microservice.resourceservice.security.ResourceAccessControlService;
import com.microservice.resourceservice.service.ResourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;
    private final ResourceAccessControlService accessControlService;

    @GetMapping
    public ResponseEntity<Page<ResourceResponse>> getAllResources(Pageable pageable) {
        return ResponseEntity.ok(resourceService.getAllResources(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceResponse> getResourceById(@PathVariable UUID id) {
        return ResponseEntity.ok(resourceService.getResourceById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ResourceResponse>> searchResources(
        @RequestParam String query,
        Pageable pageable
    ) {
        return ResponseEntity.ok(resourceService.searchResources(query, pageable));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<ResourceResponse>> filterResources(
        @RequestParam(required = false) IndustryEnum industry,
        @RequestParam(required = false) ResourceLevelEnum level,
        Pageable pageable
    ) {
        return ResponseEntity.ok(resourceService.filterResources(industry, level, pageable));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResourceResponse> createResource(
        @Valid @RequestBody ResourceRequest request,
        @AuthenticationPrincipal Jwt jwt
    ) {
        accessControlService.assertCanManageResources(jwt);
        return ResponseEntity.status(HttpStatus.CREATED).body(resourceService.createResource(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResourceResponse> updateResource(
        @PathVariable UUID id,
        @Valid @RequestBody ResourceRequest request,
        @AuthenticationPrincipal Jwt jwt
    ) {
        accessControlService.assertCanManageResources(jwt);
        return ResponseEntity.ok(resourceService.updateResource(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteResource(
        @PathVariable UUID id,
        @AuthenticationPrincipal Jwt jwt
    ) {
        accessControlService.assertCanManageResources(jwt);
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<ResourceCategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(resourceService.getAllCategories());
    }

    @PostMapping("/categories")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResourceCategoryResponse> createCategory(
        @Valid @RequestBody ResourceCategoryRequest request,
        @AuthenticationPrincipal Jwt jwt
    ) {
        accessControlService.assertCanManageResources(jwt);
        return ResponseEntity.status(HttpStatus.CREATED).body(resourceService.createCategory(request));
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<List<UserBookmarkResponse>> getBookmarks(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.ok(resourceService.getUserBookmarks(userId));
    }

    @PostMapping("/bookmarks/{id}")
    public ResponseEntity<UserBookmarkResponse> addBookmark(
        @PathVariable UUID id,
        @AuthenticationPrincipal Jwt jwt
    ) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.status(HttpStatus.CREATED).body(resourceService.addBookmark(userId, id));
    }

    @DeleteMapping("/bookmarks/{id}")
    public ResponseEntity<Void> removeBookmark(
        @PathVariable UUID id,
        @AuthenticationPrincipal Jwt jwt
    ) {
        UUID userId = UUID.fromString(jwt.getSubject());
        resourceService.removeBookmark(userId, id);
        return ResponseEntity.noContent().build();
    }
}
