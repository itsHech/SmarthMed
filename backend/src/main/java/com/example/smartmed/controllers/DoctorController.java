package com.example.smartmed.controllers;

import com.example.smartmed.dtos.DoctorDTO;
import com.example.smartmed.models.Doctor;
import com.example.smartmed.services.DoctorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@AllArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorDTO doctorDTO) throws Exception {
        Doctor createdDoctor = doctorService.createDoctor(doctorDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDoctor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorDTO doctorDTO) throws Exception {
        Doctor updatedDoctor = doctorService.updateDoctor(id, doctorDTO);
        return ResponseEntity.ok(updatedDoctor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) throws Exception {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getById(@PathVariable Long id) throws Exception {
        Doctor doctor = doctorService.getById(id);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAll() {
        List<Doctor> doctors = doctorService.getAll();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Doctor> getByEmail(@PathVariable String email) throws Exception {
        Doctor doctor = doctorService.getByEmail(email);
        return ResponseEntity.ok(doctor);
    }
} 