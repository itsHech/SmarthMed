package com.example.smartmed.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String password;
    private String specialty;
    private String licenseNumber;
} 