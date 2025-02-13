package com.example.smartmed.services.impl;

import com.example.smartmed.dtos.AppointmentRequest;
import com.example.smartmed.dtos.AppointmentResponse;
import com.example.smartmed.models.Appointment;
import com.example.smartmed.models.Doctor;
import com.example.smartmed.models.Patient;
import com.example.smartmed.repositories.AppointmentRepository;
import com.example.smartmed.repositories.DoctorRepository;
import com.example.smartmed.repositories.PatientRepository;
import com.example.smartmed.services.AppointmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    private static final LocalTime MORNING_START = LocalTime.of(8, 0);
    private static final LocalTime MORNING_END = LocalTime.of(12, 0);
    private static final LocalTime AFTERNOON_START = LocalTime.of(13, 0);
    private static final LocalTime AFTERNOON_END = LocalTime.of(17, 0);

    @Override
    public List<LocalDateTime> getDoctorAvailableSlots(Long doctorId, LocalDateTime date) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));

        List<LocalDateTime> allSlots = generateTimeSlots(date);
        List<Appointment> existingAppointments = appointmentRepository
                .findByDoctorAndStartTimeBetween(doctor, date.toLocalDate().atStartOfDay(),
                        date.toLocalDate().atTime(23, 59));

        allSlots.removeAll(existingAppointments.stream()
                .map(Appointment::getStartTime)
                .collect(Collectors.toList()));

        return allSlots;
    }

    private List<LocalDateTime> generateTimeSlots(LocalDateTime date) {
        List<LocalDateTime> slots = new ArrayList<>();
        LocalDateTime current = date.with(MORNING_START);

        // Morning slots
        while (!current.toLocalTime().isAfter(MORNING_END)) {
            slots.add(current);
            current = current.plusHours(1);
        }

        // Afternoon slots
        current = date.with(AFTERNOON_START);
        while (!current.toLocalTime().isAfter(AFTERNOON_END)) {
            slots.add(current);
            current = current.plusHours(1);
        }

        return slots;
    }

    @Override
    @Transactional
    public AppointmentResponse createAppointment(Long patientId, AppointmentRequest request) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));

        // Validate time slot
        List<LocalDateTime> availableSlots = getDoctorAvailableSlots(doctor.getId(), request.getStartTime());
        if (!availableSlots.contains(request.getStartTime())) {
            throw new IllegalArgumentException("Selected time slot is not available");
        }

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setStartTime(request.getStartTime());
        appointment.setEndTime(request.getStartTime().plusHours(1));
        appointment.setDescription(request.getDescription());
        appointment.setStatus(Appointment.Status.PENDING);

        return AppointmentResponse.fromAppointment(appointmentRepository.save(appointment));
    }

    @Override
    public List<AppointmentResponse> getPatientAppointments(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
        return appointmentRepository.findByPatient(patient).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponse> getDoctorAppointments(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));
        return appointmentRepository.findByDoctor(doctor).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponse> getDoctorPendingAppointments(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));
        return appointmentRepository.findByDoctorAndStatus(doctor, Appointment.Status.PENDING).stream()
                .map(AppointmentResponse::fromAppointment)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AppointmentResponse approveAppointment(Long doctorId, Long appointmentId) {
        Appointment appointment = getAppointmentForDoctor(doctorId, appointmentId);
        appointment.setStatus(Appointment.Status.APPROVED);
        return AppointmentResponse.fromAppointment(appointmentRepository.save(appointment));
    }

    @Override
    @Transactional
    public AppointmentResponse rejectAppointment(Long doctorId, Long appointmentId) {
        Appointment appointment = getAppointmentForDoctor(doctorId, appointmentId);
        appointment.setStatus(Appointment.Status.REJECTED);
        return AppointmentResponse.fromAppointment(appointmentRepository.save(appointment));
    }

    private Appointment getAppointmentForDoctor(Long doctorId, Long appointmentId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        if (!appointment.getDoctor().getId().equals(doctor.getId())) {
            throw new IllegalArgumentException("This appointment does not belong to the specified doctor");
        }

        return appointment;
    }
}
