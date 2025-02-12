package com.example.smartmed.services.impl;

import com.example.smartmed.dtos.PatientRecordDTO;
import com.example.smartmed.dtos.PatientRecordResponseDTO;
import com.example.smartmed.dtos.PatientRecordSimpleResponseDTO;
import com.example.smartmed.models.MedicalRecord;
import com.example.smartmed.models.PatientRecord;
import com.example.smartmed.repositories.PatientRecordRepository;
import com.example.smartmed.services.PatientRecordService;
import com.example.smartmed.services.MedicalRecordService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientRecordServiceImpl implements PatientRecordService {
    private final PatientRecordRepository patientRecordRepository;
    private final MedicalRecordService medicalRecordService;

    public PatientRecordServiceImpl(PatientRecordRepository patientRecordRepository, MedicalRecordService medicalRecordService) {
        this.patientRecordRepository = patientRecordRepository;
        this.medicalRecordService = medicalRecordService;
    }

    private PatientRecordResponseDTO convertToDTO(PatientRecord patientRecord) throws Exception {
        PatientRecordResponseDTO dto = new PatientRecordResponseDTO();
        dto.setId(patientRecord.getId());
        dto.setMedicalRecord(medicalRecordService.getById(patientRecord.getMedicalRecord().getId()));
        dto.setConsultationDate(patientRecord.getConsultationDate());
        dto.setSymptoms(patientRecord.getSymptoms());
        dto.setDiagnosis(patientRecord.getDiagnosis());
        dto.setTreatment(patientRecord.getTreatment());
        dto.setDoctorNotes(patientRecord.getDoctorNotes());
        return dto;
    }

    private PatientRecordSimpleResponseDTO convertToSimpleDTO(PatientRecord patientRecord) {
        PatientRecordSimpleResponseDTO dto = new PatientRecordSimpleResponseDTO();
        dto.setId(patientRecord.getId());
        dto.setConsultationDate(patientRecord.getConsultationDate());
        dto.setSymptoms(patientRecord.getSymptoms());
        dto.setDiagnosis(patientRecord.getDiagnosis());
        dto.setTreatment(patientRecord.getTreatment());
        dto.setDoctorNotes(patientRecord.getDoctorNotes());
        return dto;
    }

    @Override
    public PatientRecordResponseDTO createPatientRecord(PatientRecordDTO patientRecordDTO) throws Exception {
        PatientRecord patientRecord = new PatientRecord();
        MedicalRecord medicalRecord = medicalRecordService.getMedicalRecordEntityById(patientRecordDTO.getMedicalRecordId());
        patientRecord.setMedicalRecord(medicalRecord);
        patientRecord.setConsultationDate(LocalDateTime.now());
        patientRecord.setDiagnosis(patientRecordDTO.getDiagnosis());
        patientRecord.setSymptoms(patientRecordDTO.getSymptoms());
        patientRecord.setTreatment(patientRecordDTO.getTreatment());
        patientRecord.setDoctorNotes(patientRecordDTO.getDoctorNotes());
        
        PatientRecord savedRecord = patientRecordRepository.save(patientRecord);
        return convertToDTO(savedRecord);
    }

    @Override
    public void deletePatientRecord(Long id) throws Exception {
        if (!patientRecordRepository.existsById(id)) {
            throw new Exception("Patient record not found");
        }
        patientRecordRepository.deleteById(id);
    }

    @Override
    public List<PatientRecordResponseDTO> getAll() throws Exception {
        return patientRecordRepository.findAll().stream()
                .map(record -> {
                    try {
                        return convertToDTO(record);
                    } catch (Exception e) {
                        throw new RuntimeException("Error converting patient record to DTO: " + e.getMessage());
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public PatientRecordResponseDTO getById(Long id) throws Exception {
        PatientRecord record = getPatientRecordEntityById(id);
        return convertToDTO(record);
    }

    @Override
    public PatientRecord getPatientRecordEntityById(Long id) throws Exception {
        return patientRecordRepository.findById(id)
                .orElseThrow(() -> new Exception("Patient record not found"));
    }

    @Override
    public PatientRecordResponseDTO updatePatientRecord(Long id, PatientRecordDTO patientRecordDTO) throws Exception {
        PatientRecord patientRecord = getPatientRecordEntityById(id);
        MedicalRecord medicalRecord = medicalRecordService.getMedicalRecordEntityById(patientRecordDTO.getMedicalRecordId());
        
        patientRecord.setMedicalRecord(medicalRecord);
        patientRecord.setConsultationDate(LocalDateTime.now());
        patientRecord.setDiagnosis(patientRecordDTO.getDiagnosis());
        patientRecord.setSymptoms(patientRecordDTO.getSymptoms());
        patientRecord.setTreatment(patientRecordDTO.getTreatment());
        patientRecord.setDoctorNotes(patientRecordDTO.getDoctorNotes());
        
        PatientRecord updatedRecord = patientRecordRepository.save(patientRecord);
        return convertToDTO(updatedRecord);
    }

    @Override
    public List<PatientRecordSimpleResponseDTO> getByMedicalRecordId(Long medicalRecordId) throws Exception {
        // Verify that the medical record exists
        medicalRecordService.getMedicalRecordEntityById(medicalRecordId);
        
        return patientRecordRepository.findByMedicalRecordId(medicalRecordId).stream()
                .map(this::convertToSimpleDTO)
                .collect(Collectors.toList());
    }
}
