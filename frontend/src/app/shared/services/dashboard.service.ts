import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getCard(): Promise<{ status: boolean; data?: any; error?: any }> {
    return new Promise((resolve) => {
      this.http.get(environment.Api_Url + `dash/cards`).subscribe(
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
