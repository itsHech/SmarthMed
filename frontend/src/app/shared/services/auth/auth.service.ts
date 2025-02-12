import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/services/localstorage/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn;
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageServ: LocalStorageService,
    private modalService: NgbModal
  ) {}

  setLocalStorage(responseObj) {
    const expiresAt = moment().add(1, 'days');
    this.localStorageServ.setItem('id_token', responseObj.token);
    this.localStorageServ.setItem(
      'expires_at',
      JSON.stringify(expiresAt.valueOf())
    );
    this.localStorageServ.setItem('id-admin', responseObj.admin);
  }
  setLocal(responseObj) {
    this.localStorageServ.setItem('token', responseObj.token);
    this.localStorageServ.setItem('id', responseObj.employee);
  }
  getToken(): string {
    return localStorage.getItem('id_token');
  }
  /**
   * signin: Save user's data when cedentials data exists
   * @param credentialsData : user's data
   */
  signin(credentialsData: object) {
    return new Promise((resolve) => {
      this.http
        .post(environment.Api_Url + 'users/login', credentialsData)
        .subscribe({
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

    // return this.http.post(environment.Api_Url + 'users/login', credentialsData).subscribe(
    //   (resp: any) => {
    //      //console.log(resp)
    //     // this.localStorageServ.setItem('user_email', resp.email);
    //     // this.localStorageServ.setItem('user_role', resp.roles);
    //   //   setTimeout(() => {
    //   //        window.location.reload();
    //   //  }, 2000);

    //     this.modalService.dismissAll();
    //   }, (err) => {
    //     this.loggedIn = false;
    //   }
    // );
  }

  /**
   *
   * @param credentialsData : user's form data
   */

  signout() {
    return this.http
      .get(environment.Api_Url + 'users/logout', {})
      .subscribe((res) => {
        this.localStorageServ.clearStorage();
      });
  }

  getConnectedUser() {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + 'users/profile').subscribe({
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

  // isSignedIn(): boolean {

  //   return moment().isBefore(this.getExpiration(), 'second');
  // }

  /**
   * Check if user belongs to auth allowedRoles list
   * @param allowedRoles: string[]
   */
  isAuthorized(allowedRoles: string[]): boolean {
    let authorized = false;

    authorized = this.localStorageServ.getItem('isUser');

    console.log('authorized', authorized);
    // Return compare roles check
    return authorized;
  }

  /**
   * Get connectd user role
   */
  getUserRole() {
    const user = this.localStorageServ.getItem('user_role');
    return user ? user.role : null;
  }

  changePassword(newPasswordForm) {
    return new Promise((resolve) => {
      this.http
        .patch(environment.Api_Url + 'users/password', newPasswordForm)
        .subscribe({
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

  /* async checkAuthenticated(): Promise<boolean> {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  } */

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  login(data) {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + `auth/login`, data).subscribe({
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
  loginClient(data) {
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + `auth/login/client`, data).subscribe({
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
  async logout(redirect: string): Promise<void> {
    try {
      localStorage.removeItem('easybank-id_token');
      localStorage.removeItem('easybank-id-admin');
      localStorage.removeItem('easybank-expires_at');
      this.isAuthenticated.next(false);
      await this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
    }
  }
  async logoutt(redirect: string): Promise<void> {
    try {
      localStorage.removeItem('easybank-token');
      localStorage.removeItem('easybank-id');
      localStorage.removeItem('easybank-expires_at');
      this.isAuthenticated.next(false);
      await this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
    }
  }
  // getExpiration() {
  //   const expiration = localStorage.getItem('expires_at');
  //   console.log('expiration', expiration);
  //   if (expiration) {
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  //   } else {
  //     return moment();
  //   }
  // }

  isLoggedIn(): boolean {
    const expiration = this.localStorageServ.getItem('expires_at');
    return moment().unix > expiration;
  }

  updatePassword(data){
    return new Promise((resolve) => {
      this.http.post(environment.Api_Url + 'auth/password/update', data).subscribe({
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
}
