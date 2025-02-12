import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getNotifications(): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + 'notif/get-all').subscribe(
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

  getUserNotifications(id: string | number): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `notif/usernotif/${id}`).subscribe(
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

  getClientNotifications(id: string | number): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `notif/clientnotif/${id}`).subscribe(
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

  activeNotification(id: string | number, data: any): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.patch(environment.Api_Url + `notif/${id}`, data).subscribe(
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
