import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../localstorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  deliveryMans$ = new BehaviorSubject([]);
  castDeliveryMan = this.deliveryMans$.asObservable();

  constructor() { }


  updateDeliveryMans(val){
    this.deliveryMans$.next(val)
  }

}
