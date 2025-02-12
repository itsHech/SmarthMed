package com.example.smartmed.services.impl;

import com.example.smartmed.dtos.DoctorDTO;
import com.example.smartmed.models.Doctor;
import com.example.smartmed.repositories.DoctorRepository;
import com.example.smartmed.services.DoctorService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;

    public DoctorServiceImpl(DoctorRepository doctorRepository, PasswordEncoder passwordEncoder) {
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Doctor createDoctor(DoctorDTO doctorDTO) throws Exception {
        Doctor doctor = new Doctor();
        doctor.setEmail(doctorDTO.getEmail());
        doctor.setFirstName(doctorDTO.getFirstName());
        doctor.setLastName(doctorDTO.getLastName());
        doctor.setPhoneNumber(doctorDTO.getPhoneNumber());
        doctor.setPassword(passwordEncoder.encode(doctorDTO.getPassword()));
        doctor.setSpecialty(doctorDTO.getSpecialty());
        doctor.setLicenseNumber(doctorDTO.getLicenseNumber());
        doctor.setCreatedAt(LocalDateTime.now());

        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor updateDoctor(Long id, DoctorDTO doctorDTO) throws Exception {
        Doctor doctor = getById(id);

        doctor.setEmail(doctorDTO.getEmail());
        doctor.setFirstName(doctorDTO.getFirstName());
        doctor.setLastName(doctorDTO.getLastName());
        doctor.setPhoneNumber(doctorDTO.getPhoneNumber());
        if (doctorDTO.getPassword() != null && !doctorDTO.getPassword().isEmpty()) {
            doctor.setPassword(passwordEncoder.encode(doctorDTO.getPassword()));
        }
        doctor.setSpecialty(doctorDTO.getSpecialty());
        doctor.setLicenseNumber(doctorDTO.getLicenseNumber());

        return doctorRepository.save(doctor);
    }

    @Override
    public void deleteDoctor(Long id) throws Exception {
        if (!doctorRepository.existsById(id)) {
            throw new Exception("Doctor not found");
        }
        doctorRepository.deleteById(id);
    }

    @Override
    public Doctor getById(Long id) throws Exception {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new Exception("Doctor not found"));
    }

    @Override
    public List<Doctor> getAll() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getByEmail(String email) throws Exception {
        return doctorRepository.findAll().stream()
                .filter(doctor -> doctor.getEmail().equals(email))
                .findFirst()
                .orElseThrow(() -> new Exception("Doctor not found"));
    }
} 