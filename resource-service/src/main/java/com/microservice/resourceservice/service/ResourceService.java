package com.microservice.resourceservice.service;

import com.microservice.resourceservice.dto.ResourceCategoryRequest;
import com.microservice.resourceservice.dto.ResourceCategoryResponse;
import com.microservice.resourceservice.dto.ResourceRequest;
import com.microservice.resourceservice.dto.ResourceResponse;
import com.microservice.resourceservice.dto.UserBookmarkResponse;
import com.microservice.resourceservice.enums.IndustryEnum;
import com.microservice.resourceservice.enums.ResourceLevelEnum;
import com.microservice.resourceservice.exception.BookmarkAlreadyExistsException;
import com.microservice.resourceservice.exception.CategoryNotFoundException;
import com.microservice.resourceservice.exception.ResourceNotFoundException;
import com.microservice.resourceservice.mapper.ResourceCategoryMapper;
import com.microservice.resourceservice.mapper.ResourceMapper;
import com.microservice.resourceservice.mapper.UserBookmarkMapper;
import com.microservice.resourceservice.messaging.event.ResourceEvent;
import com.microservice.resourceservice.messaging.producer.ResourceEventProducer;
import com.microservice.resourceservice.model.Resource;
import com.microservice.resourceservice.model.ResourceCategory;
import com.microservice.resourceservice.model.UserBookmark;
import com.microservice.resourceservice.repository.ResourceCategoryRepository;
import com.microservice.resourceservice.repository.ResourceRepository;
import com.microservice.resourceservice.repository.UserBookmarkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final ResourceCategoryRepository categoryRepository;
    private final UserBookmarkRepository bookmarkRepository;
    private final ResourceMapper resourceMapper;
    private final ResourceCategoryMapper categoryMapper;
    private final UserBookmarkMapper bookmarkMapper;
    private final ResourceEventProducer eventProducer;

    @Transactional(readOnly = true)
    public Page<ResourceResponse> getAllResources(Pageable pageable) {
        return resourceRepository.findAll(pageable).map(resourceMapper::toResponse);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "resource", key = "#id")
    public ResourceResponse getResourceById(UUID id) {
        Resource resource = resourceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found: " + id));
        return resourceMapper.toResponse(resource);
    }

    @Transactional(readOnly = true)
    public Page<ResourceResponse> searchResources(String query, Pageable pageable) {
        return resourceRepository.searchByTitleOrDescription(query, pageable)
            .map(resourceMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public Page<ResourceResponse> filterResources(IndustryEnum industry, ResourceLevelEnum level, Pageable pageable) {
        if (industry != null && level != null) {
            return resourceRepository.findByIndustryAndLevel(industry, level, pageable)
                .map(resourceMapper::toResponse);
        }
        if (industry != null) {
            return resourceRepository.findByIndustry(industry, pageable)
                .map(resourceMapper::toResponse);
        }
        if (level != null) {
            return resourceRepository.findByLevel(level, pageable)
                .map(resourceMapper::toResponse);
        }
        return getAllResources(pageable);
    }

    @Transactional
    @CacheEvict(value = {"resource"}, allEntries = true)
    public ResourceResponse createResource(ResourceRequest request) {
        if (resourceRepository.existsByUrl(request.getUrl())) {
            throw new IllegalArgumentException("Resource with URL already exists: " + request.getUrl());
        }

        ResourceCategory category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new CategoryNotFoundException("Category not found: " + request.getCategoryId()));

        Resource resource = resourceMapper.toEntity(request);
        resource.setCategory(category);
        Resource saved = resourceRepository.save(resource);

        ResourceEvent event = ResourceEvent.builder()
            .eventId(UUID.randomUUID())
            .resourceId(saved.getId())
            .eventType("CREATED")
            .resourceTitle(saved.getTitle())
            .timestamp(LocalDateTime.now())
            .build();
        eventProducer.publishResourceCreated(event);

        return resourceMapper.toResponse(saved);
    }

    @Transactional
    @CachePut(value = "resource", key = "#id")
    public ResourceResponse updateResource(UUID id, ResourceRequest request) {
        Resource resource = resourceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found: " + id));

        ResourceCategory category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new CategoryNotFoundException("Category not found: " + request.getCategoryId()));

        if (!resource.getUrl().equals(request.getUrl()) && resourceRepository.existsByUrl(request.getUrl())) {
            throw new IllegalArgumentException("Resource with URL already exists: " + request.getUrl());
        }

        resource.setTitle(request.getTitle());
        resource.setDescription(request.getDescription());
        resource.setUrl(request.getUrl());
        resource.setType(request.getType());
        resource.setLevel(request.getLevel());
        resource.setIndustry(request.getIndustry());
        resource.setThumbUrl(request.getThumbUrl());
        resource.setCategory(category);

        return resourceMapper.toResponse(resourceRepository.save(resource));
    }

    @Transactional
    @CacheEvict(value = {"resource"}, allEntries = true)
    public void deleteResource(UUID id) {
        Resource resource = resourceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found: " + id));

        resourceRepository.delete(resource);

        ResourceEvent event = ResourceEvent.builder()
            .eventId(UUID.randomUUID())
            .resourceId(id)
            .eventType("DELETED")
            .resourceTitle(resource.getTitle())
            .timestamp(LocalDateTime.now())
            .build();
        eventProducer.publishResourceDeleted(event);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "categories")
    public List<ResourceCategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toResponse).toList();
    }

    @Transactional
    @CacheEvict(value = "categories", allEntries = true)
    public ResourceCategoryResponse createCategory(ResourceCategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Category with name already exists: " + request.getName());
        }
        return categoryMapper.toResponse(categoryRepository.save(categoryMapper.toEntity(request)));
    }

    @Transactional(readOnly = true)
    public List<UserBookmarkResponse> getUserBookmarks(UUID userId) {
        return bookmarkRepository.findByUserId(userId).stream().map(bookmarkMapper::toResponse).toList();
    }

    @Transactional
    public UserBookmarkResponse addBookmark(UUID userId, UUID resourceId) {
        if (bookmarkRepository.existsByUserIdAndResource_Id(userId, resourceId)) {
            throw new BookmarkAlreadyExistsException("Bookmark already exists for this resource");
        }

        Resource resource = resourceRepository.findById(resourceId)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found: " + resourceId));

        UserBookmark bookmark = UserBookmark.builder()
            .userId(userId)
            .resource(resource)
            .build();

        return bookmarkMapper.toResponse(bookmarkRepository.save(bookmark));
    }

    @Transactional
    public void removeBookmark(UUID userId, UUID bookmarkId) {
        UserBookmark bookmark = bookmarkRepository.findById(bookmarkId)
            .orElseThrow(() -> new ResourceNotFoundException("Bookmark not found: " + bookmarkId));

        if (!bookmark.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Cannot delete another user's bookmark");
        }

        bookmarkRepository.delete(bookmark);
    }
}
