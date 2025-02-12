import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  loginClient(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post(environment.Api_Url + 'client-login/login', data)
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

  sendNewPass(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post(environment.Api_Url + 'client-login/password/newaccount', data)
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

  getAllClients(page?: number, itemsPerPage?: number, search?: string, sortby?: string): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .get(
          environment.Api_Url +
            `client/get-all?limit=${itemsPerPage}&page=${page}&search=${search}&sortby=${sortby}`
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

  getClientById(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `client/${id}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  editClient(id: string, data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `client/${id}`, data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  saveClient(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'client', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  forgotPass(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post(environment.Api_Url + 'client-login/password/forgot', data)
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

  resetPass(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.http
        .post(environment.Api_Url + 'client-login/password/reset', data)
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

  deleteClient(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.http.delete(environment.Api_Url + `client/${id}`).subscribe(
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
