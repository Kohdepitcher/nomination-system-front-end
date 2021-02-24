import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import { take, switchMap } from 'rxjs/operators';


//custom snack service
import {SnackService} from '../services/snack.service';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackService, 
    private router: Router, 
    //private state: RouterStateSnapshot
    ) {
      
    }
    
    // async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
    
    //   return true;
    // }
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
      // const user = await this.afAuth.auth.currentUser;
      // const isLoggedIn = !!user;
      
      // // const token = this.afAuth.auth.currentUser.getIdTokenResult();
      // //  if (!!(await token).claims.)
      
      // //if the user is not logged in, show snack bar with error
      // if (!isLoggedIn) {
      //   this.snack.authError();
      // }
      
      // return isLoggedIn;
      
      //store array of roles passed into auth guard
      let roles = route.data.roles as Array<string>;
      
      return this.afAuth.authState.pipe(
        
        //take the first firebase user
        take(1),
        
        switchMap(async  (authState) => {
          
          //check if user is logged in
          if (authState) {
            
            //store the token from the user
            const token = await authState.getIdTokenResult()
            
            //check if user doesnt have admin claim
            // if (token.claims.role != "admin") {
            
            
            
            //if the roles doesnt contain the user role
            //index of -1, isnt in the array
            if (roles.indexOf(token.claims.role) == -1) {
              
              //navigate back to login screen
              // this.router.navigate(['/login'], { 
              //   queryParams: {returnURL: state.url }
              // });
              
              //show auth error
              this.snack.authorisedError();
              
              //return false i.e. not allowed to access route
              return false;
            } 
            
            //otherwise user has got admin claim
            else {
              
              //return true i.e. allowed to access route
              return true;
            }
            
          } 
          
          //user isnt logged in
          else {

            // if (route.parent.routeConfig.path != null) {
              //navigate to login screen
              // this.router.navigate(['/login'], { 
              //   queryParams: {returnURL: route.parent.routeConfig.path + '/' + route.routeConfig.path }
              // });
            // } else {
            //   //navigate to login screen
            // this.router.navigate(['/login'], { 
            //   queryParams: {returnURL: route.routeConfig.path }
            // });
            // }
            
            this.router.navigate(['/login'], { 
              queryParams: {returnURL: state.url }
            });
            
            
            //return false i.e. not allowed to access route
            return false
          }
        })
        )
      }
      
    }
