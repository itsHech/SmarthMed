package com.example.smartmed.controllers;

import com.example.smartmed.dtos.AuthResponse;
import com.example.smartmed.dtos.DoctorSignupRequest;
import com.example.smartmed.dtos.LoginRequest;
import com.example.smartmed.dtos.SignupRequest;
import com.example.smartmed.models.User;
import com.example.smartmed.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/patient/signup")
    public ResponseEntity<User> patientSignup(@RequestBody SignupRequest signupRequest) {
        User user = authService.createPatient(signupRequest);
        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/doctor/signup")
    public ResponseEntity<User> doctorSignup(
            @RequestBody DoctorSignupRequest doctorSignupRequest) {
        User user = authService.createDoctor(doctorSignupRequest);
        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) throws IOException {
        try {
            return ResponseEntity.ok(authService.login(loginRequest));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (DisabledException e) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User account is disabled");
            return null;
        }
    }
}
