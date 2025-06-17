package com.soma.backend;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.soma.backend.dto.ContentCreateRequestDto;
import com.soma.backend.dto.ContentDto;
import com.soma.backend.dto.ContentUpdateRequestDto;
import com.soma.backend.service.ContentService;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Testcontainers
@WithMockUser(username = "admin", roles = {"ADMIN"})
@ActiveProfiles("test")
@TestMethodOrder(OrderAnnotation.class)
@Disabled("Disabling until the test configuration issue with Testcontainers and Surefire is resolved.")
public class ContentServiceIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("somapages")
            .withUsername("user")
            .withPassword("password");

    @DynamicPropertySource
    static void datasourceConfig(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private ContentService contentService;

    private final String TYPE = "articles";

    @BeforeEach
    void setUp() {
        // Clean database before each test
        List<ContentDto> existing = contentService.getContents(TYPE);
        existing.forEach(dto -> contentService.deleteContent(TYPE, dto.getSlug()));
    }

    @AfterEach
    void tearDown() {
        // Clean up after each test
        List<ContentDto> existing = contentService.getContents(TYPE);
        existing.forEach(dto -> contentService.deleteContent(TYPE, dto.getSlug()));
    }

    @Test
    void CRUD_flow_should_work() {
        // Create
        ContentCreateRequestDto createDto = new ContentCreateRequestDto();
        createDto.setSlug("dummy-post");
        createDto.setTitle("Dummy Post");
        createDto.setContent("Hello World");
        createDto.setTags(List.of("test"));

        ContentDto created = contentService.createContent(TYPE, createDto);
        assertThat(created).isNotNull();
        assertThat(created.getSlug()).isEqualTo("dummy-post");

        // Read list
        List<ContentDto> list = contentService.getContents(TYPE);
        assertThat(list).hasSize(1);

        // Read one
        ContentDto fetched = contentService.getContentBySlug(TYPE, "dummy-post");
        assertThat(fetched.getMetadata().get("title")).isEqualTo("Dummy Post");

        // Update
        ContentUpdateRequestDto updateDto = new ContentUpdateRequestDto();
        updateDto.setTitle("Updated Title");
        updateDto.setContent("Updated body");
        updateDto.setTags(List.of("updated"));

        ContentDto updated = contentService.updateContent(TYPE, "dummy-post", updateDto);
        assertThat(updated.getMetadata().get("title")).isEqualTo("Updated Title");

        // Delete
        contentService.deleteContent(TYPE, "dummy-post");
        List<ContentDto> afterDelete = contentService.getContents(TYPE);
        assertThat(afterDelete).isEmpty();
    }
} 