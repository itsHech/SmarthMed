package com.example.smartmed.services;

import com.example.smartmed.dtos.PatientRecordDTO;
import com.example.smartmed.dtos.PatientRecordResponseDTO;
import com.example.smartmed.dtos.PatientRecordSimpleResponseDTO;
import com.example.smartmed.models.PatientRecord;

import java.util.List;

public interface PatientRecordService {
    PatientRecordResponseDTO createPatientRecord(PatientRecordDTO patientRecordDTO) throws Exception;
    void deletePatientRecord(Long id) throws Exception;
    List<PatientRecordResponseDTO> getAll() throws Exception;
    PatientRecordResponseDTO getById(Long id) throws Exception;
    PatientRecordResponseDTO updatePatientRecord(Long id, PatientRecordDTO patientRecordDTO) throws Exception;
    PatientRecord getPatientRecordEntityById(Long id) throws Exception;
    List<PatientRecordSimpleResponseDTO> getByMedicalRecordId(Long medicalRecordId) throws Exception;
}
