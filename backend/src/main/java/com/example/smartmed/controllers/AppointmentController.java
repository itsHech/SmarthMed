package com.example.smartmed.controllers;

import com.example.smartmed.dtos.AppointmentRequest;
import com.example.smartmed.dtos.AppointmentResponse;
import com.example.smartmed.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/doctors/{doctorId}/available-slots")
    public ResponseEntity<List<LocalDateTime>> getDoctorAvailableSlots(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) {
        return ResponseEntity.ok(appointmentService.getDoctorAvailableSlots(doctorId, date));
    }

    @PostMapping("/patients/{patientId}/book")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<AppointmentResponse> bookAppointment(
            @PathVariable Long patientId,
            @RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.createAppointment(patientId, request));
    }

    @GetMapping("/patients/{patientId}")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<AppointmentResponse>> getPatientAppointments(@PathVariable Long patientId) {
        return ResponseEntity.ok(appointmentService.getPatientAppointments(patientId));
    }

    @GetMapping("/doctors/{doctorId}")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<List<AppointmentResponse>> getDoctorAppointments(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentService.getDoctorAppointments(doctorId));
    }

    @GetMapping("/doctors/{doctorId}/pending")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<List<AppointmentResponse>> getDoctorPendingAppointments(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentService.getDoctorPendingAppointments(doctorId));
    }

    @PutMapping("/doctors/{doctorId}/appointments/{appointmentId}/approve")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<AppointmentResponse> approveAppointment(
            @PathVariable Long doctorId,
            @PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.approveAppointment(doctorId, appointmentId));
    }

    @PutMapping("/doctors/{doctorId}/appointments/{appointmentId}/reject")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<AppointmentResponse> rejectAppointment(
            @PathVariable Long doctorId,
            @PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.rejectAppointment(doctorId, appointmentId));
    }
} 