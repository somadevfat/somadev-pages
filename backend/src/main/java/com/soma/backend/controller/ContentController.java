package com.soma.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soma.backend.dto.ContentDto;
import com.soma.backend.service.ContentService;

@RestController
@RequestMapping("/api/contents")
public class ContentController {

    private final ContentService contentService;

    @Autowired
    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<ContentDto>> getContents(@PathVariable String type) {
        List<ContentDto> contents = contentService.getContents(type);
        return ResponseEntity.ok(contents);
    }

    @GetMapping("/{type}/{slug}")
    public ResponseEntity<ContentDto> getContentBySlug(@PathVariable String type, @PathVariable String slug) {
        ContentDto content = contentService.getContentBySlug(type, slug);
        if (content != null) {
            return ResponseEntity.ok(content);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{type}")
    public ResponseEntity<ContentDto> createContent(@PathVariable String type, @RequestBody ContentDto contentDto) {
        ContentDto createdContent = contentService.createContent(type, contentDto);
        return new ResponseEntity<>(createdContent, HttpStatus.CREATED);
    }

    @PutMapping("/{type}/{slug}")
    public ResponseEntity<ContentDto> updateContent(@PathVariable String type, @PathVariable String slug, @RequestBody ContentDto contentDto) {
        ContentDto updatedContent = contentService.updateContent(type, slug, contentDto);
        return ResponseEntity.ok(updatedContent);
    }

    @DeleteMapping("/{type}/{slug}")
    public ResponseEntity<Void> deleteContent(@PathVariable String type, @PathVariable String slug) {
        contentService.deleteContent(type, slug);
        return ResponseEntity.noContent().build();
    }
} 