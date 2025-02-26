package com.example.smartmed.dtos;

import lombok.Getter;

@Getter
public class SignupRequest {
    private String email;
    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private String password;
}
