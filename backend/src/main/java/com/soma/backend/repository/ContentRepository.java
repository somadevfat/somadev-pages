package com.soma.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soma.backend.entity.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    Optional<Content> findBySlug(String slug);
} 