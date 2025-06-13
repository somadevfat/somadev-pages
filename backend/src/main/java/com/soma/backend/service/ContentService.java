package com.soma.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.soma.backend.dto.ContentCreateRequestDto;
import com.soma.backend.dto.ContentDto;
import com.soma.backend.dto.ContentUpdateRequestDto;
import com.soma.backend.entity.Content;
import com.soma.backend.exception.ResourceNotFoundException;
import com.soma.backend.repository.ContentRepository;

@Service
public class ContentService {

    private final ContentRepository contentRepository;
    private final ObjectMapper objectMapper;

    public ContentService(ContentRepository contentRepository, ObjectMapper objectMapper) {
        this.contentRepository = contentRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public List<ContentDto> getContents(String type) {
        return contentRepository.findAllByType(type).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ContentDto getContentBySlug(String type, String slug) {
        Content content = contentRepository.findByTypeAndSlug(type, slug)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with type: " + type + " slug: " + slug));
        return toDto(content);
    }

    @Transactional
    public ContentDto createContent(String type, ContentCreateRequestDto createDto) {
        Content content = new Content();
        content.setType(type);
        content.setSlug(createDto.getSlug());
        content.setTitle(createDto.getTitle());
        content.setContent(createDto.getContent());

        Map<String, Object> metadataMap = new LinkedHashMap<>();
        metadataMap.put("title", createDto.getTitle());
        metadataMap.put("date", LocalDate.now().toString());
        metadataMap.put("dateTime", java.time.LocalDateTime.now().toString());
        metadataMap.put("summary", "This is a new article."); // Default summary

        java.util.List<String> tags = createDto.getTags() != null ? createDto.getTags() : new ArrayList<>();
        metadataMap.put("tags", tags);
        
        try {
            content.setMetadata(objectMapper.writeValueAsString(metadataMap));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing metadata", e);
        }

        Content savedContent = contentRepository.save(content);
        return toDto(savedContent);
    }

    @Transactional
    public ContentDto updateContent(String type, String slug, ContentUpdateRequestDto updateDto) {
        Content content = contentRepository.findByTypeAndSlug(type, slug)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with type: " + type + " slug: " + slug));

        content.setTitle(updateDto.getTitle());
        content.setContent(updateDto.getContent());

        try {
            // The metadata is a string, so we need to deserialize it first.
            Map<String, Object> metadataMap = objectMapper.readValue(content.getMetadata(), Map.class);
            metadataMap.put("title", updateDto.getTitle());

            // tags がリクエストに含まれていれば上書き
            if (updateDto.getTags() != null) {
                metadataMap.put("tags", updateDto.getTags());
            }

            // Serialize it back to a string to save.
            content.setMetadata(objectMapper.writeValueAsString(metadataMap));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error updating metadata", e);
        }
        
        Content updatedContent = contentRepository.save(content);
        return toDto(updatedContent);
    }

    @Transactional
    public void deleteContent(String type, String slug) {
        // ensure existence for proper 404 handling
        Content content = contentRepository.findByTypeAndSlug(type, slug)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with type: " + type + " slug: " + slug));
        contentRepository.delete(content);
    }

    private ContentDto toDto(Content content) {
        try {
            Map<String, Object> metadataMap = objectMapper.readValue(content.getMetadata(), Map.class);
            return new ContentDto(content.getSlug(), metadataMap, content.getContent());
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error deserializing metadata", e);
        }
    }
} 