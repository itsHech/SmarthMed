package com.example.smartmed.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecordResponseDTO {
    private Long id;
    private PatientResponseDTO patient;
    private String diagnosis;
    private String prescriptions;
    private String treatmentPlan;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date recordDate;
} 