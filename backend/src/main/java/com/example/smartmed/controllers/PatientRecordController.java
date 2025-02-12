package com.example.smartmed.controllers;

import com.example.smartmed.dtos.PatientRecordDTO;
import com.example.smartmed.dtos.PatientRecordResponseDTO;
import com.example.smartmed.dtos.PatientRecordSimpleResponseDTO;
import com.example.smartmed.services.PatientRecordService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/patient-records")
public class PatientRecordController {
    private final PatientRecordService patientRecordService;

    @PostMapping
    public ResponseEntity<PatientRecordResponseDTO> create(@RequestBody PatientRecordDTO patientRecordDTO) throws Exception {
        PatientRecordResponseDTO patientRecord = patientRecordService.createPatientRecord(patientRecordDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(patientRecord);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            List<PatientRecordResponseDTO> patientRecords = patientRecordService.getAll();
            return ResponseEntity.ok(patientRecords);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientRecordResponseDTO> getById(@PathVariable Long id) throws Exception {
        PatientRecordResponseDTO patientRecord = patientRecordService.getById(id);
        return ResponseEntity.ok(patientRecord);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
        patientRecordService.deletePatientRecord(id);
        return ResponseEntity.ok("Record deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientRecordResponseDTO> update(@PathVariable Long id, @RequestBody PatientRecordDTO patientRecordDTO) throws Exception {
        PatientRecordResponseDTO patientRecord = patientRecordService.updatePatientRecord(id, patientRecordDTO);
        return ResponseEntity.ok(patientRecord);
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<?> getByMedicalRecordId(@PathVariable Long medicalRecordId) {
        try {
            List<PatientRecordSimpleResponseDTO> patientRecords = patientRecordService.getByMedicalRecordId(medicalRecordId);
            return ResponseEntity.ok(patientRecords);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception e) {
        Map<String, String> error = new HashMap<>();
        error.put("error", e.getMessage());
        return ResponseEntity.badRequest().body(error);
    }
}
