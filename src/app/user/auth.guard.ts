import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

//custom snack service
import {SnackService} from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth, private snack: SnackService) { }
  
  //make aync so that it returns a promise
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
      const user = await this.afAuth.currentUser;
      const isLoggedIn = !!user;

      // const token = this.afAuth.auth.currentUser.getIdTokenResult();
      //  if (!!(await token).claims.)

      //if the user is not logged in, show snack bar with error
      if (!isLoggedIn) {
        this.snack.authError();
      }

      return isLoggedIn;

  }
  
}
