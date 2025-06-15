package com.soma.backend.dto;

import lombok.Data;

@Data
public class ContentCreateRequestDto {
    private String slug;
    private String title;
    private String summary;
    private String content;

    // 記事に関連付けるタグ
    private java.util.List<String> tags;
} 