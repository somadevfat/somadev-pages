package com.soma.backend.config;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "content.storage")
public class ContentStorageProperties {
    private Map<String, String> paths;
} 