import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  constructor(private http: HttpClient) {}

  saveSimulation(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'simulation', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  saveProspect(data: any) {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'prospect', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  editSimulation(id: string | number, data: any) {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `simulation/${id}`, data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  editProspect(id: string | number, data: any) {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `prospect/${id}`, data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getAllProspects(page: number = 1, itemsPerPage: number = 10, search: string = '', status: string = '') {
    return new Promise((resolve) => {
      this.http
        .get(environment.Api_Url + `prospect/get-all?limit=${itemsPerPage}&page=${page}&search=${search}&status=${status}`)
        .subscribe(
          (res: any) => {
            resolve({ status: true, data: res });
          },
          (err: any) => {
            resolve({ status: false, error: err });
          }
        );
    });
  }

  getAllSimulations(page: number = 1, search: string = '', status: string = '') {
    return new Promise((resolve) => {
      this.http
        .get(environment.Api_Url + `simulation/get-all?&page=${page}&search=${search}&status=${status}`)
        .subscribe(
          (res: any) => {
            resolve({ status: true, data: res });
          },
          (err: any) => {
            resolve({ status: false, error: err });
          }
        );
    });
  }

  getAllCredits() {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + 'credit/get-all').subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getOneSimulation(id: string | number) {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `simulation/${id}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getOneCredit(id: string | number) {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `credit/${id}`).subscribe(
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
