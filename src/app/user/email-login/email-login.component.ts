import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {Router, ActivatedRoute} from '@angular/router'

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth.service'
import { UserManagementDBService } from '../../services/user-management-db.service'

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {

  //redirect URL
  redirectURL: string = "";

  //collection of form elements
  form: FormGroup;

  //different form actions depending on what the user is trying to do
  type: 'login' | 'signup' | 'reset' = 'login';

  //loading state
  loading = false;

  //string to store a message from firebase if something fails for example
  serverMessage: string;

  //constructer
  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private db: AngularFirestore, private authService: AuthService, private router: Router, private route: ActivatedRoute, private httpService: UserManagementDBService) {}

  ngOnInit() {

    this.redirectURL = this.route.snapshot.queryParams['returnURL'] || '/trial_dates'

    console.log(this.redirectURL);

    //set the form (form group) to contain a group of fields
    this.form = this.fb.group({

      //name field validator
      name:['', [Validators.required]],

      //email field validators
      email: ['', [Validators.required, Validators.email]],

      //password validators
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],

      //password confirm field
      passwordConfirm: ['', []]
    });

    
  }

  //convenience method to change the form depending on the users choice
  changeType(val) {
    this.type = val;
  }

  //getters
  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  //getters to get form elements from the form
  get name() {
    return this.form.get('name')
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  //check if passwords do match
  get passwordDoesMatch() {

    //if the current type of user action is signup return true for a match
    if (this.type !== 'signup') {
      return true;
    } 
    
    //otherwise return true or false depending on it the 2 password fields match
    else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  //does backend work when form is submitted
  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;
    const name = this.name.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.router.navigate([this.redirectURL]);
          this.redirectURL = null;
        })
      }

      //if the form is for signing up
      if (this.isSignup) {

        //create the user with email and password
        await this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {

          //update the user record with their name
          this.httpService.setUpAfterSignup(name).subscribe(() => {

            //if successful, navigate to the jumpout list page
            this.router.navigate([this.redirectURL]);
            this.redirectURL = null;

          }, error => {
            this.serverMessage = error
            window.alert(error.message)
          })

          // this.afAuth.auth.currentUser.updateProfile({
          //   displayName: name
          // }).then(() => {

          //   this.router.navigate([this.redirectURL]);
          //   this.redirectURL = null;

          // }).catch((error) => {
          //   window.alert(error)
          // })

        })
        
      }
      
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
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