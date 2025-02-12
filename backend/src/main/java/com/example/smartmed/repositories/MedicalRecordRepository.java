package com.example.smartmed.repositories;

import com.example.smartmed.models.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    // Add custom queries if needed
}
