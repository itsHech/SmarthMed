import { CommonModule } from '@angular/common';
import { MainComponent } from "../main/main.component";
import { AboutComponent } from "../about/about.component";
import { ServicesComponent } from "../services/services.component";
import { QaComponent } from "../qa/qa.component";
import { ContactComponent } from "../contact/contact.component";
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
//import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MainComponent, AboutComponent, ServicesComponent, QaComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
