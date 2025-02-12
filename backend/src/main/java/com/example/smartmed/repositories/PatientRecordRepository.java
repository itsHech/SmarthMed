package com.example.smartmed.repositories;

import com.example.smartmed.models.PatientRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRecordRepository extends JpaRepository<PatientRecord, Long> {
    List<PatientRecord> findByMedicalRecordId(Long medicalRecordId);
}
