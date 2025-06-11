package com.soma.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.soma.backend.dto.ContentDto;
import com.soma.backend.entity.Content;
import com.soma.backend.exception.ResourceNotFoundException;
import com.soma.backend.repository.ContentRepository;

@Service
public class ContentService {

    private final ContentRepository contentRepository;

    @Autowired
    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @Transactional(readOnly = true)
    public List<ContentDto> getContents(String type) {
        // The 'type' parameter is ignored for now, as the entity doesn't have a type field.
        return contentRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ContentDto getContentBySlug(String type, String slug) {
        Content content = contentRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with slug: " + slug));
        return mapToDto(content);
    }

    @Transactional
    public ContentDto createContent(String type, ContentDto contentDto) {
        Content content = mapToEntity(contentDto);
        // The 'type' parameter is ignored for now.
        Content newContent = contentRepository.save(content);
        return mapToDto(newContent);
    }

    @Transactional
    public ContentDto updateContent(String type, String slug, ContentDto contentDto) {
        Content content = contentRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with slug: " + slug));

        content.setMetadata(contentDto.getMetadata());
        content.setBody(contentDto.getBody());

        Content updatedContent = contentRepository.save(content);
        return mapToDto(updatedContent);
    }

    @Transactional
    public void deleteContent(String type, String slug) {
        Content content = contentRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with slug: " + slug));
        contentRepository.delete(content);
    }

    private ContentDto mapToDto(Content content) {
        return new ContentDto(content.getSlug(), content.getMetadata(), content.getBody());
    }

    private Content mapToEntity(ContentDto contentDto) {
        Content content = new Content();
        content.setSlug(contentDto.getSlug());
        content.setMetadata(contentDto.getMetadata());
        content.setBody(contentDto.getBody());
        return content;
    }
} 