package com.example.smartmed.repositories;

import com.example.smartmed.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // Add custom queries if needed
} 