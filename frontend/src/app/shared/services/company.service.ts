import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  saveCompany(data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'company', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  editCompany(id: string, data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `company/${id}`, data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getCompany(id: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `company/${id}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getCompanies(): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + 'company/get-all').subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getBanks(): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + 'bank/get-all').subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  deleteCompany(id: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.delete(environment.Api_Url + `company/${id}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }
}
