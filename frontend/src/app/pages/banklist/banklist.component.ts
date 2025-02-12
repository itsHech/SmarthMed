import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankService } from 'src/app/services/bank.service';
import Swal from 'sweetalert2';
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-banklist',
  templateUrl: './banklist.component.html',
  styleUrls: ['./banklist.component.scss'],
})
export class BanklistComponent implements OnInit {
  page: number = 1;
  totalItems: any;
  searchTerm: string;
  currentBank: any = {};
  bankList: any = [];
  isMenuOpen = false;
  isPartnerMenuOpen = false;
  bankForm: FormGroup;
  @ViewChild(MatMenuTrigger, {static: false}) trigger: MatMenuTrigger;
  recheckIfInMenu: boolean;
  constructor(
    private bankService: BankService,
    private route: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllBanks();
    this.bankForm = new FormGroup({
      bankName: new FormControl('',[Validators.required]),
      bankEmail: new FormControl('',[Validators.required])
    })
    this.recheckIfInMenu = false;
  }
  openResourceMenu() {
    this.trigger.openMenu();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  togglePartnerMenu() {
    this.isPartnerMenuOpen = !this.isPartnerMenuOpen;
  }
  closeResourceMenu() {
    setTimeout(() => {
      if (this.recheckIfInMenu === false) {
        this.trigger.closeMenu();
      }
    }, 150);
  }
  onTableDataChange(e) {
    console.log(e);
    this.page = e;
    this.runFilter();
  }

  search(e) {
    // console.log(e);
    // console.log(this.searchTerm);
    this.page = 1;
    this.runFilter();
  }

  getAllBanks() {
    this.bankService.getAllBanks(this.page, 6, '').then((res: any) => {
      console.log('all banks: ', res);
      if (res.status) {

        this.bankList = res.data.results;
        this.totalItems = res.data.counts;
        console.log("res.data.results",res.data.results)
      }
    });
  }

  saveBank() {
    console.log(this.bankForm.value);
    this.bankService.saveBank(this.bankForm.value).then((res: any) => {
      console.log(res);
      if (res.status) {
        Swal.mixin({
          customClass: { confirmButton: 'btn btn-success' },
        })
          .fire({
            // title: 'Are you sure?',
            text: 'Banque ajoutée avec succès',
            icon: 'success',

            confirmButtonText: 'Close',

            reverseButtons: true,
          })
          .then((res) => {
            if (res.isConfirmed || res.isDismissed) {
              this.getAllBanks();
              this.modalService.dismissAll();
              this.bankForm.reset();
            }
          });
      }
    });
  }

  delBank() {
    console.log('delll emp');
    this.bankService.deleteBank(this.currentBank._id).then((res: any) => {
      if (res.status) {
        this.getAllBanks();

        Swal.mixin({
          customClass: { confirmButton: 'btn btn-success' },
        }).fire({
          text: 'Banque supprimé avec succès',
          icon: 'success',

          confirmButtonText: 'Close',

          reverseButtons: true,
        });

      }
    });
    this.modalService.dismissAll();
  }

  runFilter() {
    this.bankService
      .getAllBanks(this.page, 6, this.searchTerm || '')
      .then((res: any) => {
        if (res.status) {
          //console.log('filter res', res);
          this.bankList = res.data.results.reverse();
          this.totalItems = res.data.counts;

          //console.log('filtred', this.trainings);
        } else {
          //console.log('err');
        }
      });
  }

  clearForm() {
    this.bankForm.reset();
  }

  openAssignModal(modal) {
    this.clearForm();
    const modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      centered: true,
    });
  }

  openSmallModal(modal, item) {
    const modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      size: 's',
      keyboard: false,
      centered: true,
    });

    this.currentBank = item;
  }

  openModal(modal, item) {
    const modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      centered: true,
    });

    this.currentBank = item;
  }

  editBank() {
    console.log('edit');

    this.bankService.editBank(
      this.currentBank._id,
      this.bankForm.value
    ).then((res: any) => {
      console.log('editresponse', res);
      if (res.status) {
        Swal.mixin({
          customClass: { confirmButton: 'btn btn-success' },
        })
          .fire({
            // title: 'Are you sure?',
            text: 'Bank modifié avec succès',
            icon: 'success',

            confirmButtonText: 'Close',

            reverseButtons: true,
          })
          .then((res) => {
            if (res.isConfirmed || res.isDismissed) {
              this.getAllBanks();
              this.modalService.dismissAll();
              this.bankForm.reset();
            }
          });
      }
    });
  }
}
