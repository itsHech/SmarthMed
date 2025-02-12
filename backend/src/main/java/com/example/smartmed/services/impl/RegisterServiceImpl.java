package com.example.smartmed.services.impl;

import com.example.smartmed.dtos.SignupRequest;
import com.example.smartmed.models.User;
import com.example.smartmed.repositories.UserRepository;
import com.example.smartmed.services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RegisterServiceImpl implements RegisterService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Cet email existe déjà");
        }

        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setPhoneNumber(signupRequest.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la sauvegarde de l'utilisateur: " + e.getMessage());
        }
    }
}
