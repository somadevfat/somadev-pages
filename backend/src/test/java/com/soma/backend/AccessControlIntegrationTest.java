package com.soma.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soma.backend.dto.ContentCreateRequestDto;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class AccessControlIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "ADMIN")
    void whenAdminUser_thenCanCreateContent() throws Exception {
        ContentCreateRequestDto createDto = new ContentCreateRequestDto();
        createDto.setSlug("new-post-admin");
        createDto.setTitle("New Post by Admin");
        createDto.setContent("Content by admin.");

        mockMvc.perform(post("/api/contents/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createDto)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = "USER")
    void whenRegularUser_thenCannotCreateContent() throws Exception {
        ContentCreateRequestDto createDto = new ContentCreateRequestDto();
        createDto.setSlug("new-post-user");
        createDto.setTitle("New Post by User");
        createDto.setContent("Content by user.");

        mockMvc.perform(post("/api/contents/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createDto)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithAnonymousUser
    void whenAnonymousUser_thenCannotCreateContent() throws Exception {
        ContentCreateRequestDto createDto = new ContentCreateRequestDto();
        createDto.setSlug("new-post-anon");
        createDto.setTitle("New Post by Anonymous");
        createDto.setContent("Content by anonymous.");

        mockMvc.perform(post("/api/contents/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createDto)))
                .andExpect(status().isForbidden());
    }
} 