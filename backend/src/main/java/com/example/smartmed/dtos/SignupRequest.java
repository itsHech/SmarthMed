package com.example.smartmed.dtos;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;

import java.util.Date;

@Getter
public class SignupRequest {

    private String email;
    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    @Temporal(TemporalType.DATE) // Indique que c'est un champ de type DATE
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;
    private String password;


}
