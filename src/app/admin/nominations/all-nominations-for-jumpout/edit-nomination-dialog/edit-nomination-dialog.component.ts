import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  EmailValidator,
} from '@angular/forms';
import { nominationTrainerMeeting } from 'src/app/data models/nominationTrainerMeeting';



@Component({
  selector: 'app-edit-nomination-dialog',
  template: `
  
<form [formGroup]="nominationForm">

  <h2 mat-dialog-title>Edit Nomination</h2>

  <mat-dialog-content class="mat-typography">

  <p>Editing nomination for trainer: {{data.user.name}}</p>

    <!-- jockey -->
    <p style="margin-bottom: 0em;"></p>
    <mat-form-field color="accent">
      <input placeholder="Jockey" formControlName='jockey' type="text" matInput [(ngModel)]="data.jockey"/>
      <mat-error *ngIf="hasError('jockey', 'required')">jockey is required</mat-error>
    </mat-form-field>

    <!-- horse name -->
    <p style="margin-bottom: 0em;"></p>
    <mat-form-field color="accent">
      <input placeholder="Horse's Name" formControlName='horseName' type="text" matInput [(ngModel)]="data.horseName"/>
      <mat-error *ngIf="hasError('horseName', 'required')">Horse's name is required</mat-error>
    </mat-form-field>

    <!-- horse age -->
    <mat-form-field color="accent">
      <mat-label>Age</mat-label>
      <mat-select [(value)] = "data.horseAge">
        <mat-option *ngFor="let age of horseAges" [value]="age.value">
          {{age.viewValue}}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <!-- horse class -->
    <mat-form-field color="accent">
      <mat-label>Class</mat-label>
      <mat-select [(value)] = "data.horseClass">
        <mat-option *ngFor="let class of classes" [value]="class.value">
          {{class.viewValue}}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <!-- scratching status -->
    <div class="checkBoxDiv">
      <mat-checkbox [(ngModel)]="data.isScratched" formControlName="scratchingStatus">Scratched</mat-checkbox>
    </div>
    
  
  </mat-dialog-content>
  
  <mat-dialog-actions align="start">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="data" cdkFocusInitial color="accent">Update</button>
  </mat-dialog-actions>

</form>
  
  `,
  styles: [
    'mat-form-field { width: 100%; margin-bottom: 1em;}',
    '.checkBoxDiv { width: 100%; margin-bottom: 1em;}'
  ]
})

export class EditNominationDialogComponent implements OnInit {

  //form group
  nominationForm: FormGroup;

  //track the scratching status
  scratchStatus: boolean = true;

  //classes array
  classes: HorseClass[] = [
    {value: 'Maiden', viewValue: 'Maiden'},
    {value: 'Class 1', viewValue: 'Class 1'},
    {value: 'Class 2', viewValue: 'Class 2'},
    {value: 'Class 3', viewValue: 'Class 3'},
    {value: 'Class 4', viewValue: 'Class 4'},
    {value: 'Class 5', viewValue: 'Class 5'},
    {value: 'Class 6', viewValue: 'Class 6'},
    {value: 'Open', viewValue: 'Open'}
  ];
  
  //horse ages array
  horseAges: HorseAge[] = [
    // {value: 1, viewValue: '1 Year Old'},
    {value: 2, viewValue: '2 Year Old'},
    {value: 3, viewValue: '3 Year Old'},
    {value: 4, viewValue: '4 Year Old'},
    {value: 5, viewValue: '5 Year Old'},
    {value: 6, viewValue: '6 Year Old'},
    {value: 7, viewValue: '7 Year Old'},
    {value: 8, viewValue: '8 Year Old'},
    {value: 9, viewValue: '9 Year Old'},
    {value: 10, viewValue: '10 Year Old'},
  ]
  
  constructor(public dialogRef: MatDialogRef<EditNominationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: nominationTrainerMeeting, private fb: FormBuilder) { 

    //set the sratching status variable from the data passed in
    this.scratchStatus = true //this.data.isScratched;

   }
  
  ngOnInit(): void {

    this.nominationForm = this.fb.group({

      jockey: [this.data.jockey],
      horseName: [this.data.horseName, Validators.required],
      scratchingStatus: [this.data.isScratched]

    })

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.nominationForm.controls[controlName].hasError(errorName);
  }
  
}

//Data Models
export interface HorseClass {
  value: string;
  viewValue: string;
}

export interface HorseAge {
  value: number;
  viewValue: string;
}
