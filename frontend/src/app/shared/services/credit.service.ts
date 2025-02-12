import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  constructor(private http: HttpClient) {}

  uploadFile(id: string, file: File): Promise<{ status: boolean; data?: any; error?: any }> {
    const formdata = new FormData();
    formdata.append('file', file);
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + `doc/uploadfiles?credit=${id}`, formdata).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getAllFiles(id: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `doc/filedb/${id}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  downloadFile(id: string, fileName: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `downloadfiledb/${fileName}?id=${id}`).subscribe(
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

  deleteFile(fileid: string, creditid: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.delete(environment.Api_Url + `doc/deletefile/${fileid}?credit=${creditid}`).subscribe(
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

  saveCredit(data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'credit', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  editCredit(id: string, data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `credit/${id}`, data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getCreditById(id: string): Promise<{ status: boolean; data?: any; error?: any }> {
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

  getAllCredits(page?: number, itemsPerPage?: number, search?: string, status?: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(
        environment.Api_Url +
          `credit/get-all?limit=${itemsPerPage}&page=${page}&search=${search}&status=${status}`
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

  deleteCredit(id: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.delete(environment.Api_Url + `credit/${id}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  sendMail(data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'email', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  reclamation(data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'email/reclamation', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getFiltredCredits(data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'credit/get-all', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err: any) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getEmailsHistory(id: string): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `email/get-all/${id}`).subscribe(
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
