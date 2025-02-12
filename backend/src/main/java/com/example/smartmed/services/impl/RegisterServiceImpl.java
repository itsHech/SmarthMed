package com.example.smartmed.services.impl;


import com.example.smartmed.dtos.SignupRequest;
import com.example.smartmed.models.User;
import com.example.smartmed.repositories.UserRepository;
import com.example.smartmed.services.RegisterService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
public class RegisterServiceImpl implements RegisterService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegisterServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public User createUser(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return null;
        }
        User user = new User();
        BeanUtils.copyProperties(signupRequest,user);
        String hashPassword = passwordEncoder.encode(signupRequest.getPassword());
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setPassword(hashPassword);
        user.setPhoneNumber(String.valueOf(signupRequest.getPhoneNumber()));
        user.setCreatedAt(LocalDateTime.now());

        User createdCustomer = userRepository.save(user);
        user.setId(createdCustomer.getId());
        return user;
    }
}
