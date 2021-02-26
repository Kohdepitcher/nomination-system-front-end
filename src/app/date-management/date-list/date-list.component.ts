import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription, Observable, interval } from 'rxjs';
import {trialDate} from '../trialDate.model';

import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


import { MatDialog } from '@angular/material/dialog';
import { DateDialogComponent } from '../dialogs/date-dialog.component';
import {DateMessageDialogComponent} from '../dialogs/date-message-dialog.component'
import { map } from 'rxjs/operators';



//chips
import {MatChipList} from '@angular/material/chips'

import { HttpClient } from '@angular/common/http'
import * as _ from 'lodash';

//data model imports
import { trialMeeting } from '../trialMeeting.model'

//import the trial date database service
import { TrialDateDatabaseService} from '../trial-date-database.service';

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { AuthService } from './../../shared/services/auth.service';


@Component({
  selector: 'date-list',
  templateUrl: './date-list.component.html',
  styleUrls: ['./date-list.component.scss']
})
export class DateListComponent implements AfterViewInit {

  //column names
  displayedColumns = [ 'date', 'time', 'location', 'distance', 'closeDate', 'remainingTime', 'more'];

  //table datasource
  dataSource: MatTableDataSource<trialMeeting>;

  //keep track of if the spinner should be shown
  showSpinner: boolean = true;

  //store instance of subscription
  databaseSubscription: Subscription;

  //starting date for filter
  startFromDate = new Date();
  endDate = new Date();

  fromDatePicker = new FormControl();
  toDatePicker = new FormControl();
  

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('meetingTable',{static:true}) table: MatTable<any>;

  constructor(private db: AngularFirestore, 
              public dialog: MatDialog, 
              public databaseService: TrialDateDatabaseService, 
              private http: HttpClient, 
              private router: Router,
              private dateAdapter: DateAdapter<any>,
              public authService: AuthService) { 

      //set the date apdapter to use au locale so that the pickers are set correctly
      this.dateAdapter.setLocale('en-au')

      // this.fromDatePicker.valueChanges.subscribe(x => {
      //   console.log(x);
      // })

      //set the starting date filter to 2 weeks before today
      this.startFromDate.setDate(this.startFromDate.getDate() - 14);

      //set the end date filter to 2 weeks from now
      this.endDate.setDate(this.endDate.getDate() + 14);

      

  }

  ngAfterViewInit() {

    //fetch trial meetings from DB as soon as page inits
    this.fetchTableData();

    
  }


  trackByUid(index, item) {
    return item.id;
  }

  
  applyFilters() {

    console.log(this.startFromDate);

    this.dataSource = null;

    //set the spinner in the table to show
    this.showSpinner = true;

    //subscribe to gettingTrialDates() method
    this.databaseService.getTrialMeetingBetweenDates(this.startFromDate, this.endDate).subscribe(trials => {

      //set the datasource for table to the trial meeting array that is returned
      this.dataSource = new MatTableDataSource(trials);

      //hide the spinner
      this.showSpinner = false;
      
      }, err => {
        console.log(err)
      }
    )

    // var timer = setInterval(function(this) {

    //   this.dataSource.data.array.forEach(element => {
        
    //     element.remainingTime = this.databaseService.calculateRemainingTime(element.closeDate)

    //   });

    // },1000, this);

    

  }
  

  //dialog
  openTrialDialog(trial?: trialMeeting): void {
    const dialogRef = this.dialog.open(DateDialogComponent, {
      width: '400px',
      data: trial
        ? { trial: {...trial}, isNew: false }
        : { trial: { }, isNew: true}
    });

    





    //subscribe to the dialog afterclose notification and grab the result
    dialogRef.afterClosed().subscribe(result => {

      //check to see if there is a result from closing the dialogue
      if (result) {

        //if the returned trial meeting is new
        if(result.isNew == true) {

          //create a new close date
          //set the hours and minutes from the result passed back from new meeting dialog
          //const newCloseDate = new Date(result.trial.closeDate).setHours(result.hours, result.minutes, 0, 0);

          const tempCloseDate = new Date(result.trial.closeDate);

          const newCloseDate = new Date(tempCloseDate.getFullYear(), tempCloseDate.getMonth(), tempCloseDate.getDate(), result.hours, result.minutes, 0, 0);

          //create a new trial date in firestore
          this.databaseService.createTrialDate(new Date(result.trial.date), new Date(newCloseDate), result.trial.location, result.trial.startTime, result.trial.distance);

          this.addTableRow(result.trial);

        }

        //else if the returned trial meeting isnt new
        else if (result.isNew == false) {

          
          //create a new close date
          //set the hours and minutes from the result passed back from new meeting dialog
          // const tempCloseDate = new Date(result.trial.closeDate);

          // const newCloseDate = new Date(tempCloseDate.getFullYear(), tempCloseDate.getMonth(), tempCloseDate.getDate(), result.hours, result.minutes, 0, 0);

          const newCloseDate = new Date(result.trial.closeDate).setHours(result.hours, result.minutes, 0, 0);

          //update the trial in the DB with the same id
          this.databaseService.updateTrialDate(result.trial.meetingId, new Date(result.trial.date), new Date(newCloseDate), result.trial.location, result.trial.startTime, result.trial.distance)

          // //get the index of the updated element
          // var indexOfUpdatedTrial = this.dataSource.data.findIndex(item => item.meetingId == result.trial.meetingId)
          // console.log(indexOfUpdatedTrial)

         this.updateTableRow(result.trial, this.findIndexOfRow(result.trial));
        }

        
      }
    });
  }

  //finds the index of a row in the datasource
  findIndexOfRow(row: trialMeeting) {
    return this.dataSource.data.findIndex(item => item.meetingId == row.meetingId);
  }

  //fetches the data for the table from the cloud database
  fetchTableData() {

    //set the spinner in the table to show
    this.showSpinner = true;

    //subscribe to gettingTrialDates() method
    this.databaseService.getTrialMeetingBetweenDates(this.startFromDate, this.endDate).subscribe(trials => {

      //set the datasource for table to the trial meeting array that is returned
      this.dataSource = new MatTableDataSource(trials);

      //hide the spinner
      this.showSpinner = false;
      
      }
    )
  }

  addTableRow(row: trialMeeting) {

    //push new row to the table
    this.dataSource.data.push(row);
  }

  updateTableRow(tableRow: trialMeeting, rowIndex: number) {

    //update the row in the table with the updated trial information
    this.dataSource.data[rowIndex].location = tableRow.location
    this.dataSource.data[rowIndex].date = tableRow.date
  }

  deleteTableRow(rowIndex: number) {

    //remove row from datasource at index
    this.dataSource.data.splice(rowIndex,1);
  }


  //deletes a trial meeting based on id of trial
  handleDelete(id: number) {

    this.databaseService.deleteTrialDate(id).subscribe(() => {
      
    });

    //call the delete func from trial data database service
    //this.databaseService.deleteTrialDate(id)
  }

  formateDate(dateString: string, includeTime: Boolean) {

    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    const optionsWithoutTime = { year: 'numeric', month: 'numeric', day: 'numeric'};
    const locales = ['en-au']

    //turn json date into date
    const date = new Date(dateString);

    //temp store the formated string
    var formattedDateString: String;

    //build up the formated date string
    // formattedDateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    if (includeTime) {
      // return date.toLocaleDateString(locales, options) + " " + date.toLocaleTimeString(locales, options);
      return date.toLocaleDateString(locales, options)
    } else {
      return date.toLocaleDateString(locales, optionsWithoutTime);
    }

    // return formattedDateString;

    

  }

  // setupCounter(date: Date) {

  //   interval(1000).pipe(map(_ => this.databaseService.calculateRemainingTime(date)));

  //   // return Observable.//.interval(1000).pipe(map(_ => myXYZFunction(time)));

  //   // setInterval(function(that) {

  //   //   return that.databaseService.calculateRemainingTime(date)

  //   // },1000)

  // //  var test = setInterval(() => this.databaseService.calculateRemainingTime(date), 1000);

  // //  return test;
  // }

  //navigates to the all nominations page with the relevant trial ID
  viewNominationsForTrial(id: number) {
    this.router.navigate(['/admin/nominations'], { 
      queryParams: { trialID: id }
    })
  }

  nominateForTrial(id: number) {
    this.router.navigate(['/nominate'], { 
      queryParams: { trialID: id }
    })
  }


}


