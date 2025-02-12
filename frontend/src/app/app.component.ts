import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { PartenariatComponent } from './partenariat/partenariat.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { TeamComponent } from './team/team.component';
import { QaComponent } from './qa/qa.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
//import { FormComponent } from './form/form.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator/calculator.component';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardMedecinComponent } from './dashboard-medecin/dashboard-medecin.component';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet,MainComponent,ReviewsComponent,PartenariatComponent,AboutComponent,ServicesComponent,QaComponent,TeamComponent,ContactComponent, CalculatorComponent,MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,LoginComponent,RegisterComponent,DashboardMedecinComponent,
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppComponent {
  title = 'Website_easybank_angular';
}
