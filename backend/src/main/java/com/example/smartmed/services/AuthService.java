package com.example.smartmed.services;

import com.example.smartmed.dtos.AuthResponse;
import com.example.smartmed.dtos.DoctorSignupRequest;
import com.example.smartmed.dtos.LoginRequest;
import com.example.smartmed.dtos.SignupRequest;
import com.example.smartmed.models.User;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    User createPatient(SignupRequest signupRequest);
    User createDoctor(DoctorSignupRequest doctorSignupRequest);
    AuthResponse login(LoginRequest loginRequest);
}
