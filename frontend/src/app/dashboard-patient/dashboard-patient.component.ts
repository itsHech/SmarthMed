import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-patient',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './dashboard-patient.component.html',
  styleUrl: './dashboard-patient.component.scss'
})
export class DashboardPatientComponent {
  appointment = {
    patientName: '',
    date: '',
    time: '',
    doctor: ''
  };

  bookAppointment() {
    console.log("Appointment booked:", this.appointment);
    alert(`Appointment booked successfully for ${this.appointment.patientName} on ${this.appointment.date} at ${this.appointment.time}`);
    
    
    this.appointment = { patientName: '', date: '', time: '', doctor: '' };
  }

}



