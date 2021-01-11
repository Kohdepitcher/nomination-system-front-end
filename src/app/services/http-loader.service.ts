import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
//   private httpLoading$ = new ReplaySubject<boolean>(1);
//   constructor() { }

//   httpProgress(): Observable<boolean> {
//     return this.httpLoading$.asObservable();
//   }

//   setHttpProgressStatus(inprogess: boolean) {
//     this.httpLoading$.next(inprogess);
//   }

visibility: BehaviorSubject<boolean>;
 
  constructor() {
    this.visibility = new BehaviorSubject(false);
  }
 
  show() {
    this.visibility.next(true);
  }
 
  hide() {
    this.visibility.next(false);
  }

}