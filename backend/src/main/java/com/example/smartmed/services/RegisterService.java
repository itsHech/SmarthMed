package com.example.smartmed.services;

import com.example.smartmed.dtos.SignupRequest;
import com.example.smartmed.models.User;

public interface RegisterService {
    User createUser(SignupRequest signupRequest);
}
