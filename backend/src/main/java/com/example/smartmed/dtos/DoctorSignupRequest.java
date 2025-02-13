package com.example.smartmed.dtos;

import lombok.Getter;

@Getter
public class DoctorSignupRequest {
    private String email;
    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private String password;
    private String specialty;
    private String licenseNumber;
}
