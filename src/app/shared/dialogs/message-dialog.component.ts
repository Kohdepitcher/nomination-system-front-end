
//imports
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-submit-nominations',
  template: `
  <h1 mat-dialog-title>{{data.title}}</h1>
  <mat-progress-bar mode="determinate" [value]="progress"></mat-progress-bar>

  
  <div mat-dialog-content>
  
    <p>{{data.message}}</p>
  
  </div>
  
  
  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">OK</button>


 
  
  </div>
  `,
  styles: []
})
export class SubmitNominationsComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<SubmitNominationsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,) { 


  }

  
  

  ngOnInit() {

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
