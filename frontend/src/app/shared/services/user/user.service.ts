import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}


  login(data) {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'auth/login', data).subscribe({
        next: (res) => {
          resolve({ status: true, data: res });
        },
        error: (err) => {
          resolve({ status: false, error: err });
        },
        complete: () => {
          console.info('complete');
        },
      });
    });
  }

  updateUser(object) {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + 'users/profile', object).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getUserByEmail(email) {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `users/email/${email}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  edituser(id, data) {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `users/${id}`, data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getManagerCount() {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + 'configs/counts').subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getNotifications() {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + 'notifications').subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getAllUsers() {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + 'users/get-all').subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }

  getUserById(id) {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `users/${id}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }



  saveUser(data) {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'users/user', data).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }
  deleteUser(id) {
    return new Promise((resolve) => {
      this.http.delete(environment.Api_Url + `users/${id}`).subscribe(
        (res: any) => {
          resolve({ status: true, data: res });
        },
        (err) => {
          resolve({ status: false, error: err });
        }
      );
    });
  }
}
