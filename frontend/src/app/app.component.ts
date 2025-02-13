import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { QaComponent } from './qa/qa.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
//import { FormComponent } from './form/form.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardMedecinComponent } from './dashboard-medecin/dashboard-medecin.component';
import { DashboardPatientComponent } from './dashboard-patient/dashboard-patient.component';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet,MainComponent, AboutComponent,ServicesComponent,QaComponent,ContactComponent,MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,LoginComponent,RegisterComponent,DashboardMedecinComponent,DashboardPatientComponent,
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppComponent {
  title = 'Website_easybank_angular';
}
