import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { initial } from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    //subscribe to the afAuth authState observable
    this.afAuth.authState.subscribe(user => {

      //if the user is loggen in
      if (user) {

        //set the user data holder to the firebase user
        this.userData = user;

        //get the token from the user
        user.getIdTokenResult().then((token) => {

          //set the role on the user data holder to the role from the token claims
          //this.userData.role = token.claims.role
          localStorage.setItem('role', JSON.stringify(token.claims.role))
        })

        //console.log(this.userData.role)

        //set the user in local storage
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        JSON.parse(localStorage.getItem('role'));
      } 
      
      //user not logged in
      else {

        //set the user in local storage to null
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  // SignIn(email, password) {
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       });
  //       this.SetUserData(result.user);
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

  // Sign up with email/password
  // SignUp(email, password, displayName) {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       /* Call the SendVerificaitonMail() function when new user sign 
  //       up and returns promise */
  //       this.SendVerificationMail();
  //       this.SetUserData(result.user);
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
      return this.afAuth.currentUser.then((user) => {
        return user.sendEmailVerification()
      })

  
      // .then(() => {
      //   this.router.navigate(['verify-email-address']);
      // })
    }

     // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  //update the user's details
  updateUserData(name: string, email: string) {

    var currentUser = this.afAuth.currentUser.then((user) => {
      
      user.updateProfile({
        displayName: name
      }).then(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
      }).catch((error) => {
        window.alert(error)
      })

      user.updateEmail(email).then(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
      }).catch((error) => {
        window.alert(error)
      })


    })

    

    
    };

    // Returns true when user is looged in and email is verified
    get isLoggedInAndVerified(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null) ? true : false;
    }

    get isEmailVerified(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user.emailVerified !== false) ? true : false;
    }

    get userRole(): string {
      return JSON.parse(localStorage.getItem('role'));
    }

    get prettyUserRole(): string {
      //get user from local storage
      const role: string = JSON.parse(localStorage.getItem('role'));

      if (role.includes("admin")) {
        return "Admin"
      }

      else if (role.includes("user")) {
        return "Trainer"
      }
    }

    get isUserAdmin(): boolean {
      const role = JSON.parse(localStorage.getItem('role'));
      return (role !== null && role == "admin") ? true : false;
    }

    get isUserTrainer(): boolean {
      const role = JSON.parse(localStorage.getItem('role'));
      return (role !== null && role == "user") ? true : false;
    }

    get userInitials(): string {

      //get user from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      
      //get a reference to the user's display name
      const userName = user.displayName || "";

      //create a names array which is the display name split by a space character
      const names: [String] = userName.split(' ');

      //empty string to store initials
      var initials = "";

      //iterate over each name
      names.forEach(element => {

        //append the first character of each string to the initials string
        initials += element.substring(0,1).toUpperCase();

      });

      //return the user's initials to be displayed
      return initials;
    }

    get userName(): String {
      //get user from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      
      return user.displayName;
    }

    get userEmail(): String {

      //get user from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      
      return user.email;

    }

  

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }  

  // Auth logic to run auth providers
  // AuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider)
  //   .then((result) => {
  //      this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       })
  //     this.SetUserData(result.user);
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['login']);
    })
  }

}