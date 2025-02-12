package com.example.smartmed.services;

import com.example.smartmed.dtos.MedicalRecordDTO;
import com.example.smartmed.dtos.MedicalRecordResponseDTO;
import com.example.smartmed.models.MedicalRecord;

import java.util.List;

public interface MedicalRecordService {
    MedicalRecordResponseDTO createRecord(MedicalRecordDTO medicalRecordDTO) throws Exception;
    MedicalRecordResponseDTO updateRecord(Long id, MedicalRecordDTO medicalRecordDTO) throws Exception;
    void deleteRecord(Long id) throws Exception;
    MedicalRecordResponseDTO getById(Long id) throws Exception;
    MedicalRecord getMedicalRecordEntityById(Long id) throws Exception;
    List<MedicalRecordResponseDTO> getAll();
    List<MedicalRecordResponseDTO> getByPatientId(Long patientId);
    List<MedicalRecordResponseDTO> getByDoctorId(Long doctorId);
}
