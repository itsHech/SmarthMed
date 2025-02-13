package com.example.smartmed.services.impl;

import com.example.smartmed.dtos.PatientDto;
import com.example.smartmed.models.Patient;
import com.example.smartmed.repositories.PatientRepository;
import com.example.smartmed.services.PatientService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public PatientServiceImpl(PatientRepository patientRepository, PasswordEncoder passwordEncoder) {
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Patient createPatient(PatientDto patientDTO) throws Exception {
        if (patientRepository.existsByEmail(patientDTO.getEmail())) {
            throw new Exception("Email already exists");
        }

        Patient patient = new Patient();
        patient.setEmail(patientDTO.getEmail());
        patient.setFirstName(patientDTO.getFirstName());
        patient.setLastName(patientDTO.getLastName());
        patient.setPhoneNumber(patientDTO.getPhoneNumber());
        patient.setPassword(passwordEncoder.encode(patientDTO.getPassword()));
        patient.setBirthDate(patientDTO.getBirthDate());
        patient.setGender(patientDTO.getGender());
        patient.setAddress(patientDTO.getAddress());

        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(Long id, PatientDto patientDTO) throws Exception {
        Patient patient = getById(id);

        if (!patient.getEmail().equals(patientDTO.getEmail()) && 
            patientRepository.existsByEmail(patientDTO.getEmail())) {
            throw new Exception("Email already exists");
        }

        patient.setEmail(patientDTO.getEmail());
        patient.setFirstName(patientDTO.getFirstName());
        patient.setLastName(patientDTO.getLastName());
        patient.setPhoneNumber(patientDTO.getPhoneNumber());
        if (patientDTO.getPassword() != null && !patientDTO.getPassword().isEmpty()) {
            patient.setPassword(passwordEncoder.encode(patientDTO.getPassword()));
        }
        patient.setBirthDate(patientDTO.getBirthDate());
        patient.setGender(patientDTO.getGender());
        patient.setAddress(patientDTO.getAddress());

        return patientRepository.save(patient);
    }

    @Override
    public void deletePatient(Long id) throws Exception {
        if (!patientRepository.existsById(id)) {
            throw new Exception("Patient not found");
        }
        patientRepository.deleteById(id);
    }

    @Override
    public Patient getById(Long id) throws Exception {
        return patientRepository.findById(id)
                .orElseThrow(() -> new Exception("Patient not found"));
    }

    @Override
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getByEmail(String email) throws Exception {
        return patientRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("Patient not found"));
    }
} 