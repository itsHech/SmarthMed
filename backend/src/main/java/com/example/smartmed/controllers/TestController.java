package com.example.smartmed.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/patient")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<String> patientEndpoint() {
        return ResponseEntity.ok("This endpoint is only accessible to patients");
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<String> doctorEndpoint() {
        return ResponseEntity.ok("This endpoint is only accessible to doctors");
    }
} 