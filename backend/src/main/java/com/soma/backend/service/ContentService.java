package com.soma.backend.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.soma.backend.dto.ContentDto;

@Service
public class ContentService {

    public List<ContentDto> getContents(String type) {
        // Return a dummy list of content
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("author", "Dummy Author");
        metadata.put("date", "2024-01-01");
        ContentDto dummyContent = new ContentDto("dummy-post", "Dummy Post", "This is a dummy post.", metadata);
        return Collections.singletonList(dummyContent);
    }

    public ContentDto getContentBySlug(String type, String slug) {
        // Return a specific dummy content
        if ("dummy-post".equals(slug)) {
            Map<String, Object> metadata = new HashMap<>();
            metadata.put("author", "Dummy Author");
            metadata.put("date", "2024-01-01");
            return new ContentDto(slug, "Dummy Post", "This is the content for " + slug, metadata);
        }
        return null; // Or throw a not found exception
    }

    public ContentDto createContent(String type, ContentDto contentDto) {
        // Pretend to create and return the content
        // In a real implementation, you would save it and assign a new slug or ID
        return contentDto;
    }

    public ContentDto updateContent(String type, String slug, ContentDto contentDto) {
        // Pretend to update and return the content
        contentDto.setSlug(slug);
        return contentDto;
    }

    public void deleteContent(String type, String slug) {
        // Pretend to delete the content
        System.out.println("Deleted content of type '" + type + "' with slug '" + slug + "'");
    }
} 