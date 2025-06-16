package com.soma.backend.config;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soma.backend.entity.Content;
import com.soma.backend.entity.User;
import com.soma.backend.repository.ContentRepository;
import com.soma.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@Profile("!test")
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        // Create admin user
            if (userRepository.findByEmail("admin@example.com").isEmpty()) {
                User admin = User.builder()
                        .email("admin@example.com")
                        .password(passwordEncoder.encode("password"))
                        .build();
                userRepository.save(admin);
            }

        // Create dummy content for testing
        if (contentRepository.findByTypeAndSlug("articles", "dummy-post").isEmpty()) {
            Content dummyPost = new Content();
            dummyPost.setType("articles");
            dummyPost.setSlug("dummy-post");
            dummyPost.setTitle("Dummy Post");
            dummyPost.setContent("This is a dummy post for testing the API. It contains some sample content to verify that the system is working correctly.");

            Map<String, Object> metadataMap = new LinkedHashMap<>();
            metadataMap.put("title", "Dummy Post");
            metadataMap.put("date", LocalDate.now().toString());
            metadataMap.put("dateTime", java.time.LocalDateTime.now().toString());
            metadataMap.put("summary", "A test post for API verification");
            metadataMap.put("tags", List.of("test", "dummy", "api"));

            try {
                dummyPost.setMetadata(objectMapper.writeValueAsString(metadataMap));
                contentRepository.save(dummyPost);
            } catch (Exception e) {
                throw new RuntimeException("Error creating dummy content", e);
            }
        }
    }
} 