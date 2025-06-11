package com.soma.backend.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentDto {
    private String slug;
    private Map<String, Object> metadata;
    private String body;
} 