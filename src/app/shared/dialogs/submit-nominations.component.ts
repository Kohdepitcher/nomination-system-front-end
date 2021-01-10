
//imports
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';

import { NominationDatabaseService } from '../../services/nominate-db.service'

@Component({
  selector: 'app-submit-nominations',
  template: `
  <h1 mat-dialog-title>Submit Nominations</h1>
  <mat-progress-bar mode="determinate" [value]="progress"></mat-progress-bar>

  
  <div mat-dialog-content>
  
  <mat-list>
  <mat-list-item *ngFor="let horse of data.horses">
    <div mat-line>{{horse.name}}</div>
    <div mat-line>{{horse.age}} Year Old {{horse.classLevel}} Ridden by: {{horse.jockey}}</div>
    <mat-divider></mat-divider>
  </mat-list-item>
  
</mat-list>
  
  </div>
  
  
  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-button (click)="submitNominations()">Submit Nominations</button>

 
  
  </div>
  `,
  styles: []
})
export class SubmitNominationsComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<SubmitNominationsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public db: NominationDatabaseService) { 


    this.nominations = this.data.horses
    console.log(this.nominations)
  }

  nominations: HorseEntry[] = this.data.horses;
  progress: number = 0;
  

  ngOnInit() {

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitNominations() {

    // this.progress = 90

    this.nominations.forEach(element => {
      
      //

      this.db.createNomination(this.data.trialID, element.jockey, element.name, element.age, element.classLevel).subscribe(res => {

        //update the progress
        this.progress = (this.nominations.length / this.nominations.indexOf(element)) * 100;

        //set the current entry to submitted
        element.submitted = true;
      }, 
      
      //catch any errur
      error => {
        console.log(error)

        //incase of an error set the status to false so that trainer can resubmit
        element.submitted = false;
      })

    });

  }

  

  setIcon(submitted: boolean) {
    if (submitted) {
      return 'check_box';
    } else {
      return 'check_box_outline_blank';
    }
  }

}

class HorseEntry {

  name: string;
  age: number;
  classLevel: string
  jockey: string;
  submitted: boolean

  constructor(name: string, age: number, classLevel: string, jockey: string) {

      this.name = name;
      this.age = age;
      this.classLevel = classLevel;
      this.jockey = jockey;
      this.submitted = false
  }
}