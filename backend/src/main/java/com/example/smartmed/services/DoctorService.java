package com.example.smartmed.services;

import com.example.smartmed.dtos.DoctorDTO;
import com.example.smartmed.models.Doctor;

import java.util.List;

public interface DoctorService {
    Doctor createDoctor(DoctorDTO doctorDTO) throws Exception;
    Doctor updateDoctor(Long id, DoctorDTO doctorDTO) throws Exception;
    void deleteDoctor(Long id) throws Exception;
    Doctor getById(Long id) throws Exception;
    List<Doctor> getAll();
    Doctor getByEmail(String email) throws Exception;
} 