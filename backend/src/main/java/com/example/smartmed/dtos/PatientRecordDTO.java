package com.example.smartmed.dtos;

import lombok.Getter;

@Getter
public class PatientRecordDTO {
    private Long medicalRecordId;
    private String symptoms;
    private String diagnosis;
    private String treatment;
    private String doctorNotes;
}