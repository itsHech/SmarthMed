import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private http: HttpClient) {}

  getAllBanks(page?: number, itemsPerPage?: number, search?: string): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .get(
          environment.Api_Url +
            `bank/get-all?limit=${itemsPerPage}&page=${page}&search=${search}`
        )
        .subscribe({
          next: (res: any) => {
            resolve({ status: true, data: res });
          },
          error: (err: any) => {
            resolve({ status: false, error: err });
          },
          complete: () => {
            console.info('complete');
          },
        });
    });
  }

  saveBank(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'bank', data).subscribe({
        next: (res: any) => {
          resolve({ status: true, data: res });
        },
        error: (err: any) => {
          resolve({ status: false, error: err });
        },
        complete: () => {
          console.info('complete');
        },
      });
    });
  }

  editBank(id: string, data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `bank/${id}`, data).subscribe({
        next: (res: any) => {
          resolve({ status: true, data: res });
        },
        error: (err: any) => {
          resolve({ status: false, error: err });
        },
        complete: () => {
          console.info('complete');
        },
      });
    });
  }

  deleteBank(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.http.delete(environment.Api_Url + `bank/${id}`).subscribe({
        next: (res: any) => {
          resolve({ status: true, data: res });
        },
        error: (err: any) => {
          resolve({ status: false, error: err });
        },
        complete: () => {
          console.info('complete');
        },
      });
    });
  }

  getTmm(): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .get(environment.Api_Url + 'tmm/get-all')
        .subscribe({
          next: (res: any) => {
            resolve({ status: true, data: res });
          },
          error: (err: any) => {
            resolve({ status: false, error: err });
          },
          complete: () => {
            console.info('complete');
          },
        });
    });
  }

  editTmm(id: string, data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `tmm/${id}`, data).subscribe({
        next: (res: any) => {
          resolve({ status: true, data: res });
        },
        error: (err: any) => {
          resolve({ status: false, error: err });
        },
        complete: () => {
          console.info('complete');
        },
      });
    });
  }
}
