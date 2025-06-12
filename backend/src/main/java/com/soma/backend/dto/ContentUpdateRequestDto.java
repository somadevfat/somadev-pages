package com.soma.backend.dto;

import lombok.Data;
 
@Data
public class ContentUpdateRequestDto {
    private String title;
    private String content;
    private java.util.List<String> tags;
} 