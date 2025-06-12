package com.soma.backend.service;

import com.soma.backend.dto.ContentUpdateRequestDto;
import com.soma.backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FileStorageService {

    private final Path contentRootPath;
    private static final Pattern FRONT_MATTER_PATTERN = Pattern.compile("(?s)^---\\n(.*?)\\n---\\n(.*)");

    public FileStorageService(@Value("${CONTENT_ROOT_PATH:/app/content}") String contentRootPath) {
        this.contentRootPath = Paths.get(contentRootPath);
    }

    public void updateContentFile(String type, String slug, ContentUpdateRequestDto updateDto) {
        Path filePath = contentRootPath.resolve(type).resolve(slug + ".md");
        if (!Files.exists(filePath)) {
            throw new ResourceNotFoundException("Content file not found with slug: " + slug);
        }

        try {
            String originalContent = new String(Files.readAllBytes(filePath), StandardCharsets.UTF_8);
            Matcher matcher = FRONT_MATTER_PATTERN.matcher(originalContent);

            if (matcher.find()) {
                String yamlStr = matcher.group(1);

                Yaml yaml = new Yaml();
                Map<String, Object> metadata = yaml.load(yamlStr);

                metadata.put("title", updateDto.getTitle());

                DumperOptions options = new DumperOptions();
                options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
                options.setPrettyFlow(true);
                Yaml writerYaml = new Yaml(options);
                String newYamlStr = writerYaml.dump(metadata);
                
                String newContentBody = updateDto.getContent();

                String updatedFileContent = "---\n" + newYamlStr + "---\n" + newContentBody;
                
                Files.write(filePath, updatedFileContent.getBytes(StandardCharsets.UTF_8));
                
            } else {
                throw new RuntimeException("Invalid file format: front matter not found for " + slug);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not update content file: " + slug, e);
        }
    }
} 