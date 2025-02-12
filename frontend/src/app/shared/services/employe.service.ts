import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  constructor(private http: HttpClient) {}

  saveEmploye(data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'employee', data).subscribe(
        {
          next: (res: any) => {
            resolve({ status: true, data: res });
          },
          error: (err: any) => {
            resolve({ status: false, error: err });
          },
          complete: () => {
            console.info('complete');
          },
        }
      );
    });
  }

  editEmploye(id: string | number, data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `employee/${id}`, data).subscribe(
        {
          next: (res: any) => {
            resolve({ status: true, data: res });
          },
          error: (err: any) => {
            resolve({ status: false, error: err });
          },
          complete: () => {
            console.info('complete');
          },
        }
      );
    });
  }

  getEmployes(page?: number, itemsPerPage?: number, search?: string, accountType?: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `employee/get-all?limit=${itemsPerPage}&page=${page}&search=${search}&accountType=${accountType}`
      ).subscribe(
        {
          next: (res: any) => {
            resolve({ status: true, data: res });
          },
          error: (err: any) => {
            resolve({ status: false, error: err });
          },
          complete: () => {
            console.info('complete');
          },
        }
      );
    });
  }

  getOneEmployee(id: string | number): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `employee/${id}`).subscribe(
        {
          next: (res: any) => {
            resolve({ status: true, data: res });
          },
          error: (err: any) => {
            resolve({ status: false, error: err });
          },
          complete: () => {
            console.info('complete');
          },
        }
      );
    });
  }

  addSimulation(id: string | number, data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `employee/${id}/simulation`, data).subscribe(
        {
          next: (res: any) => {
            resolve({ status: true, data: res });
          },
          error: (err: any) => {
            resolve({ status: false, error: err });
          },
          complete: () => {
            console.info('complete');
          },
        }
      );
    });
  }

  deleteEmploye(id: string | number): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.delete(environment.Api_Url + `employee/${id}`).subscribe(
        {
          next: (res: any) => {
            resolve({ status: true, data: res });
          },
          error: (err: any) => {
            resolve({ status: false, error: err });
          },
          complete: () => {
            console.info('complete');
          },
        }
      );
    });
  }
}
