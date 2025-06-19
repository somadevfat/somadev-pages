package com.soma.backend.config;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.soma.backend.entity.ERole;
import com.soma.backend.entity.Role;
import com.soma.backend.entity.User;
import com.soma.backend.repository.RoleRepository;
import com.soma.backend.repository.UserRepository;

@Configuration
@Profile("test")
public class TestDatabaseInitializer {

    @Bean
    CommandLineRunner initDatabase(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Initialize roles
            Role adminRole;
            Role userRole;
            
            if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
                adminRole = roleRepository.save(new Role(ERole.ROLE_ADMIN));
            } else {
                adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).get();
            }
            
            if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
                userRole = roleRepository.save(new Role(ERole.ROLE_USER));
            } else {
                userRole = roleRepository.findByName(ERole.ROLE_USER).get();
            }
            
            // Initialize test admin user
            if (userRepository.findByEmail("admin@example.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("password"));
                admin.setRoles(Set.of(adminRole));
                userRepository.save(admin);
            }
            
            // Initialize test regular user
            if (userRepository.findByEmail("user@example.com").isEmpty()) {
                User user = new User();
                user.setEmail("user@example.com");
                user.setPassword(passwordEncoder.encode("userpass"));
                user.setRoles(Set.of(userRole));
                userRepository.save(user);
            }
        };
    }
} 