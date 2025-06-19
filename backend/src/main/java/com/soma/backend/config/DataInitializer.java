package com.soma.backend.config;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soma.backend.entity.Content;
import com.soma.backend.entity.ERole;
import com.soma.backend.entity.Role;
import com.soma.backend.entity.User;
import com.soma.backend.repository.ContentRepository;
import com.soma.backend.repository.RoleRepository;
import com.soma.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
@Profile({"local", "dev", "prod"})
public class DataInitializer implements CommandLineRunner {

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ContentRepository contentRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        log.info("Running DataInitializer with adminEmail={} and adminPassword set? {}", adminEmail, adminPassword != null);

        if (adminEmail == null || adminEmail.isBlank() || adminPassword == null || adminPassword.isBlank()) {
            throw new IllegalStateException("APP_ADMIN_EMAIL または APP_ADMIN_PASSWORD が設定されていません。環境変数または application-*.properties に設定してください。");
        }

        // Skip initialization if admin already exists
        if (userRepository.findByEmail(adminEmail).isPresent()) {
            log.info("Admin user already exists. Skipping DataInitializer.");
            return;
        }

        // Initialize roles
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_USER));
        }

        // Create admin user
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        User admin = User.builder()
                .email(adminEmail)
                .password(passwordEncoder.encode(adminPassword))
                .roles(Set.of(adminRole))
                .build();
        userRepository.save(admin);
        log.info("Admin user created: {}", adminEmail);

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