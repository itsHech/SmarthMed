package com.example.smartmed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SmartMedApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartMedApplication.class, args);
    }
}
