package com.example.smartmed.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponseDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String gender;
} 