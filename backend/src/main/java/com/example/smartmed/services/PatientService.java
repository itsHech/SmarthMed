package com.example.smartmed.services;

import com.example.smartmed.dtos.PatientDto;
import com.example.smartmed.models.Patient;

import java.util.List;

public interface PatientService {
    Patient createPatient(PatientDto patientDTO) throws Exception;
    Patient updatePatient(Long id, PatientDto patientDTO) throws Exception;
    void deletePatient(Long id) throws Exception;
    Patient getById(Long id) throws Exception;
    List<Patient> getAll();
    Patient getByEmail(String email) throws Exception;
}
