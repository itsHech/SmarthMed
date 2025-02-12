package com.example.smartmed.controllers;

import com.example.smartmed.dtos.MedicalRecordDTO;
import com.example.smartmed.dtos.MedicalRecordResponseDTO;
import com.example.smartmed.services.MedicalRecordService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@AllArgsConstructor
public class MedicalRecordController {
    private final MedicalRecordService medicalRecordService;

    @PostMapping
    public ResponseEntity<MedicalRecordResponseDTO> createRecord(@RequestBody MedicalRecordDTO medicalRecordDTO) throws Exception {
        MedicalRecordResponseDTO createdRecord = medicalRecordService.createRecord(medicalRecordDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRecord);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecordResponseDTO> updateRecord(@PathVariable Long id, @RequestBody MedicalRecordDTO medicalRecordDTO) throws Exception {
        MedicalRecordResponseDTO updatedRecord = medicalRecordService.updateRecord(id, medicalRecordDTO);
        return ResponseEntity.ok(updatedRecord);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) throws Exception {
        medicalRecordService.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordResponseDTO> getById(@PathVariable Long id) throws Exception {
        MedicalRecordResponseDTO record = medicalRecordService.getById(id);
        return ResponseEntity.ok(record);
    }

    @GetMapping
    public ResponseEntity<List<MedicalRecordResponseDTO>> getAll() {
        List<MedicalRecordResponseDTO> records = medicalRecordService.getAll();
        return ResponseEntity.ok(records);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecordResponseDTO>> getByPatientId(@PathVariable Long patientId) {
        List<MedicalRecordResponseDTO> records = medicalRecordService.getByPatientId(patientId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalRecordResponseDTO>> getByDoctorId(@PathVariable Long doctorId) {
        List<MedicalRecordResponseDTO> records = medicalRecordService.getByDoctorId(doctorId);
        return ResponseEntity.ok(records);
    }
} 