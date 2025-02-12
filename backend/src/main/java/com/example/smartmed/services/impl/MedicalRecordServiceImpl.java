package com.example.smartmed.services.impl;

import com.example.smartmed.dtos.MedicalRecordDTO;
import com.example.smartmed.dtos.MedicalRecordResponseDTO;
import com.example.smartmed.dtos.PatientResponseDTO;
import com.example.smartmed.models.Doctor;
import com.example.smartmed.models.MedicalRecord;
import com.example.smartmed.models.Patient;
import com.example.smartmed.repositories.DoctorRepository;
import com.example.smartmed.repositories.MedicalRecordRepository;
import com.example.smartmed.repositories.PatientRepository;
import com.example.smartmed.services.MedicalRecordService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MedicalRecordServiceImpl implements MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public MedicalRecordServiceImpl(MedicalRecordRepository medicalRecordRepository,
                                  PatientRepository patientRepository,
                                  DoctorRepository doctorRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    private PatientResponseDTO convertToPatientDTO(Patient patient) {
        PatientResponseDTO dto = new PatientResponseDTO();
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setEmail(patient.getEmail());
        dto.setPhoneNumber(patient.getPhoneNumber());
        dto.setGender(patient.getGender());
        return dto;
    }

    private MedicalRecordResponseDTO convertToDTO(MedicalRecord record) {
        MedicalRecordResponseDTO dto = new MedicalRecordResponseDTO();
        dto.setId(record.getId());
        dto.setPatient(convertToPatientDTO(record.getPatient()));
        dto.setDiagnosis(record.getDiagnosis());
        dto.setPrescriptions(record.getPrescriptions());
        dto.setTreatmentPlan(record.getTreatmentPlan());
        dto.setRecordDate(new Date(record.getRecordDate().getTime()));
        return dto;
    }

    @Override
    public MedicalRecordResponseDTO createRecord(MedicalRecordDTO medicalRecordDTO) throws Exception {
        Patient patient = patientRepository.findById(medicalRecordDTO.getPatientId())
                .orElseThrow(() -> new Exception("Patient not found"));
        
        Doctor doctor = doctorRepository.findById(medicalRecordDTO.getDoctorId())
                .orElseThrow(() -> new Exception("Doctor not found"));

        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setPatient(patient);
        medicalRecord.setDoctor(doctor);
        medicalRecord.setDiagnosis(medicalRecordDTO.getDiagnosis());
        medicalRecord.setPrescriptions(medicalRecordDTO.getPrescriptions());
        medicalRecord.setTreatmentPlan(medicalRecordDTO.getTreatmentPlan());
        medicalRecord.setRecordDate(Timestamp.valueOf(LocalDateTime.now()));

        MedicalRecord savedRecord = medicalRecordRepository.save(medicalRecord);
        return convertToDTO(savedRecord);
    }

    @Override
    public MedicalRecordResponseDTO updateRecord(Long id, MedicalRecordDTO medicalRecordDTO) throws Exception {
        MedicalRecord existingRecord = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new Exception("Medical record not found"));
        
        Patient patient = patientRepository.findById(medicalRecordDTO.getPatientId())
                .orElseThrow(() -> new Exception("Patient not found"));
        
        Doctor doctor = doctorRepository.findById(medicalRecordDTO.getDoctorId())
                .orElseThrow(() -> new Exception("Doctor not found"));

        existingRecord.setPatient(patient);
        existingRecord.setDoctor(doctor);
        existingRecord.setDiagnosis(medicalRecordDTO.getDiagnosis());
        existingRecord.setPrescriptions(medicalRecordDTO.getPrescriptions());
        existingRecord.setTreatmentPlan(medicalRecordDTO.getTreatmentPlan());

        MedicalRecord updatedRecord = medicalRecordRepository.save(existingRecord);
        return convertToDTO(updatedRecord);
    }

    @Override
    public void deleteRecord(Long id) throws Exception {
        if (!medicalRecordRepository.existsById(id)) {
            throw new Exception("Medical record not found");
        }
        medicalRecordRepository.deleteById(id);
    }

    @Override
    public MedicalRecordResponseDTO getById(Long id) throws Exception {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new Exception("Medical record not found"));
        return convertToDTO(record);
    }

    @Override
    public List<MedicalRecordResponseDTO> getAll() {
        return medicalRecordRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicalRecordResponseDTO> getByPatientId(Long patientId) {
        return medicalRecordRepository.findAll().stream()
                .filter(record -> record.getPatient().getId().equals(patientId))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicalRecordResponseDTO> getByDoctorId(Long doctorId) {
        return medicalRecordRepository.findAll().stream()
                .filter(record -> record.getDoctor().getId().equals(doctorId))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MedicalRecord getMedicalRecordEntityById(Long id) throws Exception {
        return medicalRecordRepository.findById(id)
                .orElseThrow(() -> new Exception("Medical record not found"));
    }
}