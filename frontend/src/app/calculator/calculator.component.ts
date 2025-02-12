import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatMenuTrigger } from '@angular/material/menu';
import {EmployeService} from '../shared/services/employe.service';
import {CompanyService} from '../shared/services/company.service';
import {SimulationService} from '../shared/services/simulation.service';


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  montantCalcule: number = 0;
  submitted = false;
  isMenuOpen = false;
  isPartnerMenuOpen = false;
  submitted3 = false;
  listEntreprises: any[] = [];
  panelOpenState = false;
  mensualite: any;
  isLinear = true;
  apportPercent = 0;
  currentMontant = 0;
  duree = 1;
  favoriteSeason = '';
  recheckIfInMenu = false;

  regFormStep1!: FormGroup; // Form for Step 1
  regFormStep2!: FormGroup; // Form for Step 4

  // Flags to track form submission
  submitted1 = false;
  submitted2 = false;

  // Form control references
  f1: any; // For Step 1
  f2: any; // For Step 4

  banquesList: any[] = [
    { _id: '1', bankName: 'Société Tunisienne de Banque « STB »'},
      { _id: '2', bankName: 'Banque Nationale Agricole « BNA »' },
      {_id: '3', bankName:     'Banque de l’Habitat « BH »'},
      {_id: '4', bankName: 'Banque de Financement des Petites et Moyennes entreprises « BFPME »'},
      {_id: '5', bankName: 'Banque Tunisienne de Solidarité « BTS »'},
      {_id: '6', bankName: 'Banque de Tunisie et des Emirats « BTE »'}, 
      {_id: '7', bankName: 'Banque Tuniso-Libyenne « BTL »'}, 
      {_id: '8', bankName: 'Tunisian Saudi Bank « TSB »'},
      {_id: '9', bankName: 'Banque Zitouna'},
      {_id: '10', bankName: 'Al Baraka Bank'},
      {_id: '11', bankName: 'Al Wifak International Bank'},
      {_id: '12', bankName: 'Amen Bank'},
      {_id: '13', bankName: 'Attijari Bank'},
      {_id: '14', bankName:  'Arab Tunisian Bank « ATB »'},
      {_id: '15', bankName: 'Arab Banking Corporation « ABC »'},
      {_id: '16', bankName: 'Banque Internationale Arabe de Tunisie «  BIAT »'},
      {_id: '17', bankName: 'Banque de Tunisie « BT »'},
      {_id: '18', bankName: 'Banque Tuniso Koweitienne « BTK »'},
      {_id: '19', bankName: 'Banque Franco Tunisienne « BFT »'},
      {_id: '20', bankName: 'Citi Bank'},
      {_id: '21', bankName: 'Qatar National Bank- Tunis « QNB-Tunis »'},
      {_id: '22', bankName: 'Union Bancaire de Commerce et d’Industrie «  UBCI »'},
      {_id: '23', bankName: 'Union Internationale de Banque «  UIB »'}
  ]; // Liste des banques

  apportPersonnel = 0;
  minapport = 0;
  maxAnnee = 10;
  isImmobiler = false;
  isauto = false;
  isConsommation = false;

  statusForm!: FormGroup;
  natureCreditForm!: FormGroup;
  revenuForm!: FormGroup;
  montantForm!: FormGroup;
  banqueForm!: FormGroup;
  prospectForm!: FormGroup;
  simulationForm!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router

    
  ) {
    this.statusForm = this.formBuilder.group({});
    this.natureCreditForm = this.formBuilder.group({});
    this.revenuForm = this.formBuilder.group({});
    this.montantForm = this.formBuilder.group({});
    this.banqueForm = this.formBuilder.group({});
    this.prospectForm = this.formBuilder.group({});
    this.simulationForm = this.formBuilder.group({});
    this.secondFormGroup = this.formBuilder.group({});

  }




  
  ngOnInit(): void {
    
    //this.getAllCompnaies();
   // this.getAllBanks();
    this.statusForm = new FormGroup({
      select: new FormControl('', [Validators.required]),
    });
    this.natureCreditForm = new FormGroup({
      nature: new FormControl('', [Validators.required]),
    });
    this.revenuForm = new FormGroup({
      salaire: new FormControl('', [Validators.required]),
      dividendes: new FormControl(0),
      autre: new FormControl(0),
    });
    this.montantForm = new FormGroup({
      montant: new FormControl('', [Validators.required]),
    });
    this.banqueForm = new FormGroup({
      nomBanque: new FormControl('', [Validators.required]),
      creditEncours: new FormControl(''),
      // mensualiteCredit: new FormControl(''),
      checkImpayé: new FormControl(''),
    });
    this.prospectForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
      birthday: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      note: new FormControl(''),
      simulation: new FormControl(''),
      // companyPhoto: new FormControl('', [Validators.required]),
      // companyPhoto: new FormControl('', [Validators.required]),
    });
    this.simulationForm = new FormGroup({
      // employee: new FormControl('', [Validators.required]),
      contractType: new FormControl('', [Validators.required]),
      creditType: new FormControl('', [Validators.required]),
      grossSalary: new FormControl(0, [Validators.required]),
      dividend: new FormControl(0),
      other: new FormControl(0),
      amount: new FormControl('', [Validators.required]),
      personalContribution: new FormControl('', [Validators.required]),
      duration: new FormControl(1, [Validators.required]),
      bank: new FormControl('', [Validators.required]),
      oldCredit: new FormControl('', [Validators.required]),
      check: new FormControl('', [Validators.required]),
      eligibility: new FormControl('', [Validators.required]),
      monthlyPayment: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
      birthday: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      note: new FormControl(''),
    });

    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl('', [Validators.required]),
    });
    this.recheckIfInMenu = false;
  }

  openResourceMenu() {
    this.trigger?.openMenu();
  }

  closeResourceMenu() {
    setTimeout(() => {
      if (this.recheckIfInMenu === false) {
        this.trigger?.closeMenu();
      }
    }, 150);
  }

  first(){
    this.stepper.reset();
  }

  firstform() {
     if (this.statusForm.value.select == 'contractuel') {
       Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success swal-custom-cancel',
          cancelButton: 'btn btn-danger swal-custom-cancel'
        },
        buttonsStyling: true
      }).fire({
          title: '',
         text: "Please contact us to verify your eligibility for a loan. - يرجى التواصل معنا للتحقق من مؤهلاتك للحصول على قرض",
         icon: 'error',
         showCancelButton: true,
         confirmButtonText: 'us contact - اتصل بنا',
          cancelButtonText: 'close - إغالق',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/contact-nous']);
          } 
})
     } else {
       this.stepper.next();
     }
    console.log(this.statusForm.value);
    this.simulationForm.patchValue({
      contractType: this.statusForm.value.select,
    });
  }


  changeApport(){
    console.log(this.natureCreditForm.value);
    this.simulationForm.patchValue({
      creditType: this.natureCreditForm.value.nature,
    });
    if (this.natureCreditForm.value.nature == 'immobilier') {
      this.isImmobiler = true;
      this.isConsommation = false;
      this.isauto = false;
      this.maxAnnee = 20;
      this.minapport = 0;
      this.apportPercent = 20;
      this.apportPersonnel=this.montantForm.value.montant*0.2
    } else if (this.natureCreditForm.value.nature == 'auto') {
      this.isImmobiler = false;
      this.isConsommation = false;
      this.isauto = true;
      this.maxAnnee = 7;
      this.minapport = 0;
      this.apportPercent = 40;
      this.apportPersonnel=this.montantForm.value.montant*0.4
    } else {
      this.isImmobiler = false;
      this.isauto = false;
      this.isConsommation = true;
      this.maxAnnee = 5;
      this.minapport = 0;
      this.apportPercent = 0;
    }
  }

  natureCreditCheck() {
    console.log(this.natureCreditForm.value);
    this.simulationForm.patchValue({
      creditType: this.natureCreditForm.value.nature,
    });
    if (this.natureCreditForm.value.nature == 'immobilier') {
      this.isImmobiler = true;
      this.isConsommation = false;
      this.isauto = false;
      this.maxAnnee = 20;
      this.minapport = 0;
      this.apportPercent = 20;
      this.apportPersonnel=this.montantForm.value.montant*0.2
    } else if (this.natureCreditForm.value.nature == 'auto') {
      this.isImmobiler = false;
      this.isConsommation = false;
      this.isauto = true;
      this.maxAnnee = 7;
      this.minapport = 0;
      this.apportPercent = 40;
      this.apportPersonnel=this.montantForm.value.montant*0.4
    } else {
      this.isImmobiler = false;
      this.isauto = false;
      this.isConsommation = true;
      this.maxAnnee = 5;
      this.minapport = 0;
      this.apportPercent = 0;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  togglePartnerMenu() {
    this.isPartnerMenuOpen = !this.isPartnerMenuOpen;
  }

  revenueCheck() {
    this.submitted1 = true;
    console.log(this.revenuForm.value);
    console.log(this.revenuForm.valid);
    if (this.revenuForm.valid) {
      console.log('valid');
      let sum =
        this.revenuForm.value.salaire +
        this.revenuForm.value.dividendes +
        this.revenuForm.value.autre;

      console.log(sum);
      if (sum < 1) {
        Swal.mixin({
          customClass: {confirmButton: 'btn btn-success'},
        }).fire({
          // title: 'Are you sure?',
          text: "Malheureusement , Votre avis d'eligibilté est defavorable",
          icon: 'error',

          confirmButtonText: 'Close',

          reverseButtons: true,
        });
      } else {
        this.stepper.next();
        this.simulationForm.patchValue({
          grossSalary: this.revenuForm.value.salaire,
          dividend: this.revenuForm.value.dividendes,
          other: this.revenuForm.value.autre,
        });
      }
    }
  }

  checkMontant() {
    this.submitted2 = true;
    console.log('Montant', this.currentMontant);
    console.log('apportpersonnel', this.apportPersonnel);
    console.log('duree', this.duree);
    this.simulationForm.patchValue({
      amount: this.currentMontant,
      personalContribution: this.apportPersonnel,
      duration: Number(this.duree),
    });
  }

  banqueCheck() {
    console.log(this.banqueForm.value);
    if (
      this.banqueForm.value.creditEncours == "false" &&
      this.banqueForm.value.checkImpayé == "false"
    ) {
      this.simulationForm.patchValue({
        bank: this.banqueForm.value.nomBanque,
        oldCredit: this.banqueForm.value.creditEncours == 'true',
        check: this.banqueForm.value.checkImpayé == 'true',
      });
      this.checkEligibilte();
    } else {
  
      Swal.mixin({
        customClass: {confirmButton: 'btn btn-success'},
      }).fire({
        // title: 'Are you sure?',
        text: "Please contact us to verify your eligibility for a loan. - يرجى التواصل معنا للتحقق من مؤهلاتك للحصول على قرض",
        icon: 'error',

        confirmButtonText: 'Close',

        reverseButtons: true,
      });
    }
  }

  checkEligibilte() {
  if (!this.duree) {
    this.duree = 1;
  }
  let t = 9.26;
  let n = this.duree * 12;
  let M = this.montantForm.value.montant - this.apportPersonnel;

  let a = M * (t / 100 / 12);
  let x = 1 + t / 100 / 12;

  let y = Math.pow(x, -n);

  let b = 1 - y;
  let mens = a / b;
  this.mensualite = mens.toFixed(3); // Assurez-vous que mensualite est bien calculée

  console.log('Mensualité:', this.mensualite); // Vérifiez la console pour le résultat

  if ((this.revenuForm.value.salaire / 12) * 0.4 >= this.mensualite) {
    this.simulationForm.patchValue({
      monthlyPayment: Number(this.mensualite),
      eligibility: true,
    });
    this.stepper.next();
  } else {
    this.simulationForm.patchValue({
      monthlyPayment: Number(this.mensualite),
      eligibility: false,
    });
    Swal.mixin({
      customClass: { confirmButton: 'btn btn-success swal-custom-cancel', cancelButton: 'btn btn-danger swal-custom-cancel' },
      buttonsStyling: true
    }).fire({
      title: '',
      text: "Please contact us to verify your eligibility for a loan. - يرجى التواصل معنا للتحقق من مؤهلاتك للحصول على قرض",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'us contact - اتصل بنا',
      cancelButtonText: 'close - إغالق',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/contact-nous']);
      }
    });
  }
}


  setBuble(range: HTMLInputElement, bubble: HTMLElement) {
    const val = range.valueAsNumber; // Utilisez valueAsNumber pour obtenir la valeur en nombre
    const min = range.min ? Number(range.min) : 0;
    const max = range.max ? Number(range.max) : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.textContent = val + '%'; // Utilisez textContent pour les éléments non input
    this.apportPercent = val;
  
    const newValue = Number(
        ((range.valueAsNumber - min) * 100) / (max - min)
      ),
      newPosition = 10 - newValue * 0.2;
    bubble.style.left = `calc(${newValue}% + (${newPosition}px))`;
  
    this.apportPersonnel = (this.currentMontant / 100) * val;
    this.apportPersonnel = Number(this.apportPersonnel.toFixed(2));
  }
  
  inpmontant(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    console.log(inputElement.value);
    this.currentMontant = Number(inputElement.value);
    this.apportPersonnel = (this.currentMontant / 100) * this.apportPercent;
    this.apportPersonnel = Number(this.apportPersonnel.toFixed(2));
  }
  
  setDuree(range: HTMLInputElement, bubble: HTMLElement) {
    const val = range.valueAsNumber;
    const str = val === 1 ? ' an' : ' ans';
    bubble.textContent = val + str;
    this.duree = val;
    const newValue = Number(
        ((range.valueAsNumber - Number(range.min)) * 100) / (Number(range.max) - Number(range.min))
      ),
      newPosition = 10 - newValue * 0.2;
    bubble.style.left = `calc(${newValue}% + (${newPosition}px))`;
  }
  





  onItemChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    console.log(target.value);
  }

  get f() {
    return this.prospectForm.controls;
  }



  onReset() {
    this.submitted = false;
    this.submitted1 = false;
    this.submitted2 = false;
    this.prospectForm.reset();
    this.revenuForm.reset();
  }
}

