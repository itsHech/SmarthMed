import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private APP_PREFIX = 'easybank';

  private storageSub = new Subject<String>();

  constructor(private router: Router) {}

  /**
   * Set item in localStorage
   * @param key: string
   * @param value: any
   */
  setItem(key: string, value: any) {
    localStorage.setItem(`${this.APP_PREFIX}-${key}`, JSON.stringify(value));
    this.storageSub.next('changed');
  }

  /**
   * Get item from localStorage
   * @param key: string
   */
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(`${this.APP_PREFIX}-${key}`));
    // this.storageSub.next('changed');
  }

  /**
   * Clear localStorage
   */
  clearStorage() {
    localStorage.clear();
    this.storageSub.next('changed');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  /**
   * Clear localStorage
   */
  removeItem(key: string) {
    localStorage.removeItem(`${this.APP_PREFIX}-${key}`);
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
}
