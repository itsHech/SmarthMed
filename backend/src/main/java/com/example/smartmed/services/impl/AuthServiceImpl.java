package com.example.smartmed.services.impl;

import com.example.smartmed.dtos.DoctorSignupRequest;
import com.example.smartmed.dtos.LoginRequest;
import com.example.smartmed.dtos.SignupRequest;
import com.example.smartmed.dtos.AuthResponse;
import com.example.smartmed.models.User;
import com.example.smartmed.repositories.UserRepository;
import com.example.smartmed.services.AuthService;
import com.example.smartmed.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.smartmed.models.Patient;
import com.example.smartmed.models.Doctor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public User createPatient(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return null;
        }
        Patient patient = new Patient();
        BeanUtils.copyProperties(signupRequest, patient);
        String hashPassword = passwordEncoder.encode(signupRequest.getPassword());
        patient.setFirstName(signupRequest.getFirstName());
        patient.setLastName(signupRequest.getLastName());
        patient.setPassword(hashPassword);
        patient.setPhoneNumber(String.valueOf(signupRequest.getPhoneNumber()));
        patient.setUserType(User.UserType.PATIENT);
        
        // Set default UserDetails fields
        patient.setAccountNonExpired(true);
        patient.setAccountNonLocked(true);
        patient.setCredentialsNonExpired(true);
        patient.setEnabled(true);

        return userRepository.save(patient);
    }

    @Override
    public User createDoctor(DoctorSignupRequest doctorSignupRequest) {
        if (userRepository.existsByEmail(doctorSignupRequest.getEmail())) {
            return null;
        }
        Doctor doctor = new Doctor();
        BeanUtils.copyProperties(doctorSignupRequest, doctor);
        String hashPassword = passwordEncoder.encode(doctorSignupRequest.getPassword());
        doctor.setFirstName(doctorSignupRequest.getFirstName());
        doctor.setLastName(doctorSignupRequest.getLastName());
        doctor.setPassword(hashPassword);
        doctor.setPhoneNumber(String.valueOf(doctorSignupRequest.getPhoneNumber()));
        doctor.setUserType(User.UserType.DOCTOR);
        doctor.setSpecialty(doctorSignupRequest.getSpecialty());
        doctor.setLicenseNumber(doctorSignupRequest.getLicenseNumber());
        
        // Set default UserDetails fields
        doctor.setAccountNonExpired(true);
        doctor.setAccountNonLocked(true);
        doctor.setCredentialsNonExpired(true);
        doctor.setEnabled(true);

        return userRepository.save(doctor);
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            
            User user = (User) authentication.getPrincipal();
            String token = jwtUtil.generateToken(user);
            
            return AuthResponse.builder()
                    .token(token)
                    .build();
                    
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
}
