package com.example.smartmed.dtos;

import com.example.smartmed.models.Appointment;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentRequest {
    private Long doctorId;
    private LocalDateTime startTime;
    private String description;
} 