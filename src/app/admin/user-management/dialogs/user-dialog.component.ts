import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AFUser } from '../../../data models/AFUser.model';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  EmailValidator,
} from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  template: `

<h1 mat-dialog-title>{{ data.isNew? 'New User' : 'Edit User'}}</h1>
<!-- <h2 mat-dialog-subtitle>{{ data.isNew? 'New User' : 'Edit User'}}</h2> -->
<form [formGroup]="userForm">

<div mat-dialog-content> 


    
    <p style="margin-bottom: 0em;">What is the name of the user?</p>
    <mat-form-field color="accent">
    <input placeholder="Name" formControlName='name' type="text" matInput [(ngModel)]="data.user.displayName"/>
    <mat-error *ngIf="hasError('name', 'required')">Name is required</mat-error>
    </mat-form-field>

    <p style="margin-bottom: 0em;">What is the email address?</p>
    <mat-form-field color="accent">
    <input placeholder="Email" matInput formControlName='email' type="email" [(ngModel)]="data.user.email"/>
    <mat-error *ngIf="hasError('email', 'required')">Email is required</mat-error>
    <mat-error *ngIf="hasError('email', 'email')">Email invalid format</mat-error>
  </mat-form-field>


    <mat-divider></mat-divider>

    <p style="margin-bottom: 0em;"></p>
    <mat-form-field>
      <mat-label>Role</mat-label>
        <mat-select [(value)] = "selectedRole" (selectionChange)="roleSelectChanged()" [disabled] ="data.isNew">
          <mat-option *ngFor="let role of roles" [value]="role.value">
            {{role.viewValue}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-divider></mat-divider>



</div>

<div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button  [mat-dialog-close]="data" cdkFocusInitial color="accent" [disabled]="!userForm.valid" type='submit'>
    {{ data.isNew? 'Create' : 'Update'}}
    </button>
</div>
</form>



    
  `,
  styles: []
})



export class UserDialogComponent implements OnInit {

  //track selected role
  selectedRole = "";

  userForm: FormGroup

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    
    // if(this.data.user.role == undefined) {
    //   this.data.user.role = this.roles[0];
    // }

    //set the selected role to user role
    this.selectedRole = this.data.user.role//this.roles[0].value;

    //force user role to be set to selected role
    this.roleSelectChanged();
    //this.selectedRole = data.user.role;
    


  }

  

  ngOnInit() {

    //create the user form
    this.userForm = this.fb.group({

      //set the form elements with default values - coming from the data
      //set the validators for each form element
      name: [this.data.user.displayName, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]]
    })

    // this.userForm.get('name').setValue = this.data.user.displayName;
    // this.userForm.get('email').setValue = this.data.user.email;
  
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  roleSelectChanged() {
    this.data.user.role = this.selectedRole;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }

    //hours for hour selector
    roles: selectOptions[] = [
      { value: "user", viewValue: 'Trainer - User' },
      { value: "admin", viewValue: 'Admin' }
      // { value: "manager", viewValue: 'Manager' },
      
    ]

}

export interface selectOptions {
  value: string;
  viewValue: string;
}
