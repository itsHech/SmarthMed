package com.example.smartmed.services;

import com.example.smartmed.dtos.AppointmentRequest;
import com.example.smartmed.dtos.AppointmentResponse;
import com.example.smartmed.models.Appointment;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentService {
    // Patient methods
    List<LocalDateTime> getDoctorAvailableSlots(Long doctorId, LocalDateTime date);
    AppointmentResponse createAppointment(Long patientId, AppointmentRequest request);
    List<AppointmentResponse> getPatientAppointments(Long patientId);
    
    // Doctor methods
    List<AppointmentResponse> getDoctorAppointments(Long doctorId);
    List<AppointmentResponse> getDoctorPendingAppointments(Long doctorId);
    AppointmentResponse approveAppointment(Long doctorId, Long appointmentId);
    AppointmentResponse rejectAppointment(Long doctorId, Long appointmentId);
}
