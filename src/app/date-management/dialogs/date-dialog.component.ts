// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-date-dialog',
//   template: `
//     <p>
//       date-dialog works!
//     </p>
//   `,
//   styles: []
// })
// export class DateDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trialMeeting } from '../trialMeeting.model';



@Component({
  selector: 'app-date-dialog',
  template: `
  <h1 mat-dialog-title>{{ data.isNew? 'New Trial Meeting' : 'Edit Trial Meeting'}}</h1>
  <!-- <p>{{data.trial.meetingId}}</p> -->
  
  <div mat-dialog-content>
  
    <p style="margin-bottom: 0em;">Where are the trials located?</p>
    <mat-form-field color="accent">
    <input placeholder="Location" matInput [(ngModel)]="data.trial.location"/>
    </mat-form-field>

    <p style="margin-bottom: 0em;">What time are the trials?</p>
    <mat-form-field color="accent">
    <input placeholder="Starting Time" matInput [(ngModel)]="data.trial.startTime"/>
    </mat-form-field>
    
    <p style="margin-bottom: 0em;">What date are the trials on?</p>
    <mat-form-field color="accent">
    <input matInput [matDatepicker]="picker" placeholder="Choose a date" [(ngModel)]="data.trial.date"> 
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    <mat-divider></mat-divider>
    
    <p style="margin-bottom: 0em;">When do nominations close? <br> Note: Nominations close on this date automatically</p>
    <mat-form-field color="accent">
    <input matInput [matDatepicker]="closePicker" placeholder="Choose a date" [(ngModel)]="data.trial.closeDate"> 
    <mat-datepicker-toggle matSuffix [for]="closePicker"></mat-datepicker-toggle>
    <mat-datepicker #closePicker></mat-datepicker>
    </mat-form-field>


    <div style="display: inline-flex">

      <mat-form-field style="width: 5em">
      <mat-label>Hour</mat-label>
        <mat-select [(value)] = "selectedHour" (selectionChange)="timeSelectChanged()">
          <mat-option *ngFor="let hour of hours" [value]="hour.value">
            {{hour.viewValue}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <p style="padding-left: 1em;padding-right: 1em;"> : </p>
      
      <mat-form-field style="width: 5em">
      <mat-label>Minute</mat-label>
        <mat-select [(value)] = "selectedMinute" (selectionChange)="timeSelectChanged()">
          <mat-option *ngFor="let minute of minutes" [value]="minute.value">
            {{minute.viewValue}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <!-- <p style="padding-left: 1em;padding-right: 1em;" color="accent"> {{ amPmText }} </p> -->

    </div>

    <mat-divider></mat-divider>

    <p style="margin-bottom: 0em;">Trial Distance</p>
    <mat-form-field color="accent">
    <input placeholder="Distance (m)" matInput [(ngModel)]="data.trial.distance"/>
    </mat-form-field>
  
  
  
  
  </div>
  
  
  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-button  [mat-dialog-close]="data" cdkFocusInitial color="accent">
  {{ data.isNew? 'Create' : 'Update'}}
  </button>
  
  </div>
  `,
  styles: []
})


export class DateDialogComponent {



  //on init of the dialog
  ngOnInit() {

    // //store a copy of the date passed through the data on constructor
    // const dateOfTrial = this.data.trial.date;

    // //set the date of the trial to toDate() of the trial date constant
    // this.data.trial.date = dateOfTrial.toDate();

    // //forces the date picker to show the date in the field

    

    // console.log(this.selectedHour);

    // console.log("init")

  }

  constructor(public dialogRef: MatDialogRef<DateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    //if the passed trial date is undefined - create a new date
    if (this.data.trial.date == undefined) {
      this.data.trial.date = new Date();
    }

    //if the passed closed date
    if (this.data.trial.closeDate == undefined) {
      this.data.trial.date = new Date();

      this.data.trial.closeDate = new Date();

      //set the hour and minutes to default
      this.data.trial.closeDate.setHours(12);
      this.data.trial.closeDate.setMinutes(0, 0);
    }

    
    //set the selected hour and minute from the close date
    this.selectedHour = new Date(this.data.trial.closeDate).getHours();
    this.selectedMinute = new Date(this.data.trial.closeDate).getMinutes();

    // console.log(data.trial.date);
    // console.log(data.trial.closeDate);

    //set the selected hour and minute to the injected data
    //so that the hour and minute in the selects are always passed back
    this.timeSelectChanged();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // onSaveClick(): void {
  //   this.data.closeDate.setHours(this.selectedHour);
  //   this.data.closeDate.setminutes(this.selectedMinute);
    
  // }

  //propeties



  //track selected hours
  selectedHour = 0;

  //track selected minute
  selectedMinute = 0;

  //track if hours is am or pm
  // isPM = false;

  // amPmText = "am";

  //hours for hour selector
  hours: selectOptions[] = [
    { value: 0, viewValue: '12am' },
    { value: 1, viewValue: '1am' },
    { value: 2, viewValue: '2am' },
    { value: 3, viewValue: '3am' },
    { value: 4, viewValue: '4am' },
    { value: 5, viewValue: '5am' },
    { value: 6, viewValue: '6am' },
    { value: 7, viewValue: '7am' },
    { value: 8, viewValue: '8am' },
    { value: 9, viewValue: '9am' },
    { value: 10, viewValue: '10am' },
    { value: 11, viewValue: '11am' },
    {value: 12, viewValue: '12pm'},
    {value: 13, viewValue: '1pm'},
    {value: 14, viewValue: '2pm'},
    {value: 15, viewValue: '3pm'},
    {value: 16, viewValue: '4pm'},
    {value: 17, viewValue: '5pm'},
    {value: 18, viewValue: '6pm'},
    {value: 19, viewValue: '7pm'},
    {value: 20, viewValue: '8pm'},
    {value: 21, viewValue: '9pm'},
    {value: 22, viewValue: '10pm'},
    {value: 23, viewValue: '11pm'},
  ]

  //minutes for minute selector
  minutes: selectOptions[] = [
    { value: 0, viewValue: '00' },
    { value: 5, viewValue: '05' },
    { value: 10, viewValue: '10' },
    { value: 15, viewValue: '15' },
    { value: 20, viewValue: '20' },
    { value: 25, viewValue: '25' },
    { value: 30, viewValue: '30' },
    { value: 35, viewValue: '35' },
    { value: 40, viewValue: '40' },
    { value: 45, viewValue: '45' },
    { value: 50, viewValue: '50' },
    { value: 55, viewValue: '55' },
    // {value: 12, viewValue: '2am'},
    // {value: 13, viewValue: '2am'},
    // {value: 14, viewValue: '2am'},
    // {value: 15, viewValue: '2am'},
    // {value: 16, viewValue: '2am'},
    // {value: 17, viewValue: '2am'},
    // {value: 18, viewValue: '2am'},
    // {value: 19, viewValue: '2am'},
    // {value: 20, viewValue: '2am'},
    // {value: 21, viewValue: '2am'},
    // {value: 22, viewValue: '2am'},
    // {value: 23, viewValue: '2am'},
  ]

  //methods
  timeSelectChanged() {

    this.data.hours = this.selectedHour;
    this.data.minutes = this.selectedMinute;

  }

}


export interface selectOptions {
  value: number;
  viewValue: string;
}