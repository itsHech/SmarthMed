import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import { CreditService } from 'src/app/services/credit.service';
import { EmployeService } from 'src/app/services/employe.service';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-contact-nous',
  templateUrl: './contact-nous.component.html',
  styleUrls: ['./contact-nous.component.scss']
})
export class ContactNousComponent {
  form: FormGroup;
  opt: any = {};
  currEmployee: any = {};

  isMenuOpen = false;
  isPartnerMenuOpen = false;

  mensualite: any;
 
  favoriteSeason: string;
  @ViewChild(MatMenuTrigger, {static: false}) trigger: MatMenuTrigger;
  recheckIfInMenu: boolean;


  constructor(private router: Router, private creditService: CreditService, private employeeService: EmployeService) {

  }

  async ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl('', [Validators.required]),
      objet: new FormControl('', [Validators.required]),
    });
    const result = localStorage.getItem('easybank-id').replace(/"|'/g, '')
    this.employeeService.getOneEmployee(result).then((res: any) => {
      this.currEmployee = res.data.employee;

    });
  }


  envoyer() {
    const controlNames = {
      message: 'Message',
      objet: 'Objet',
    };
    let isFormIncomplete = true;
    for (const controlName in this.form.controls) {
      const control = this.form.get(controlName);
      if (control.value !== null && control.value !== '') {
        isFormIncomplete = false;
      }
      if (isFormIncomplete) {
        Swal.mixin({
          customClass: {confirmButton: 'btn btn-success'},
        }).fire({
          text: 'Tous les champs sont requis',
          icon: 'error',
          confirmButtonText: 'Close',
          reverseButtons: true,
        });
        return;
      } else if (control.errors?.required) {
        Swal.mixin({
          customClass: {confirmButton: 'btn btn-success'},
        }).fire({
          text: 'Le champ ' + controlNames[controlName] + ' est requis',
          icon: 'error',
          confirmButtonText: 'Close',
          reverseButtons: true,
        });
        return;
      }
    }

    if (this.form.get(['objet']).invalid) {

      Swal.mixin({
        customClass: {confirmButton: 'btn btn-success'},
      }).fire({
        // title: 'Are you sure?',
        text: 'objet invalide',
        icon: 'error',
        confirmButtonText: 'Close',
        reverseButtons: true,
      });
    } else {
      this.opt.message = this.form.get(['message']).value;
      this.opt.subject = this.form.get(['objet']).value;
      this.opt.employee = this.currEmployee._id;
      this.creditService.reclamation(this.opt).then((res: any) => {
        if (res.status) {
          Swal.mixin({
            customClass: {confirmButton: 'btn btn-success'},
          })
            .fire({
              // title: 'Are you sure?',
              text: 'email envoyé avec success',
              icon: 'success',

              confirmButtonText: 'Close',

              reverseButtons: true,
            })
            .then((res) => {
              if (res.isConfirmed || res.isDismissed) {
                this.router.navigate([`/dashboard/client/`]);
              }
            });
        } else {
          Swal.mixin({
            customClass: {confirmButton: 'btn btn-success'},
          }).fire({
            // title: 'Are you sure?',
            text: 'Error',
            icon: 'error',

            confirmButtonText: 'Close',

            reverseButtons: true,
          });
        }
      });
    }
  }




  openResourceMenu() {
    this.trigger.openMenu();
  }

  closeResourceMenu() {
    setTimeout(() => {
      if (this.recheckIfInMenu === false) {
        this.trigger.closeMenu();
      }
    }, 150);
  }

  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  togglePartnerMenu() {
    this.isPartnerMenuOpen = !this.isPartnerMenuOpen;
  }
}

