package com.example.smartmed.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecordDTO {
    private Long patientId;
    private Long doctorId;
    private String diagnosis;
    private String prescriptions;
    private String treatmentPlan;
}
