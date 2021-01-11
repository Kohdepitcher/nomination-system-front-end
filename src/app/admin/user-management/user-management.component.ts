import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatSort, MatTableDataSource, MatTable, DateAdapter} from '@angular/material';

//import the user database service
import { UserManagementDBService } from '../../services/user-management-db.service';
import { Subscription } from 'rxjs';

//material component imports
import { MatDialog } from '@angular/material/dialog';

import { UserDialogComponent } from '../user-management/dialogs/user-dialog.component'

//data model
import { AFUser } from '../../data models/AFUser.model';

//custom snack service
import {SnackService} from '../../services/snack.service';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, AfterViewInit {

  //properties

  //store instance of subscription
  databaseSubscription: Subscription;

  //column names
  displayedColumns = ['displayName', 'email', 'role', 'edit'];

  //table datasource
  dataSource: MatTableDataSource<AFUser>;

  //keep track of if the spinner should be shown
  showSpinner: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private databaseService: UserManagementDBService,
    private dialog: MatDialog,
    private snack: SnackService) { }

  ngOnInit() {


  }

  ngAfterViewInit() {

    //subscribe to gettingTrialDates() method
    this.databaseService.getAllUsers().subscribe(users => {

      console.log(users);

      //set the datasource for table to the trial meeting array that is returned
      this.dataSource = new MatTableDataSource(users);

      //hide the spinner
      this.showSpinner = false;

          //set up row sort
          this.dataSource.sort = this.sort;

    }, error => {
        this.showSpinner = false;
        this.snack.notification("Error Fetching Users", "OK")
    })



  }

  //table filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //dialog
  openUserDialog(user?: AFUser): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user
        ? { user: { ...user }, isNew: false }
        : { user: {}, isNew: true }
    });

    //subscribe to the dialog afterclose notification and grab the result
    dialogRef.afterClosed().subscribe(result => {

    //check to see if there is a result from closing the dialogue
    if (result) {

      //if the returned user is new
      if(result.isNew == true) {

        //create a new close date
        //set the hours and minutes from the result passed back from new meeting dialog
        //const newCloseDate = new Date(result.trial.closeDate).setHours(result.hours, result.minutes, 0, 0);

        // const tempCloseDate = new Date(result.trial.closeDate);

        // const newCloseDate = new Date(tempCloseDate.getFullYear(), tempCloseDate.getMonth(), tempCloseDate.getDate(), result.hours, result.minutes, 0, 0);

        // //create a new trial date in firestore
        // this.databaseService.createTrialDate(new Date(result.trial.date), new Date(newCloseDate), result.trial.location, result.trial.startTime, result.trial.distance);

        // this.addTableRow(result.trial);

        this.snack.notification("Created New User","OK")

      }

      //else if the returned trial meeting isnt new
      else if (result.isNew == false) {

        
        //   //create a new close date
        //   //set the hours and minutes from the result passed back from new meeting dialog
        //   // const tempCloseDate = new Date(result.trial.closeDate);

        //   // const newCloseDate = new Date(tempCloseDate.getFullYear(), tempCloseDate.getMonth(), tempCloseDate.getDate(), result.hours, result.minutes, 0, 0);

        //   const newCloseDate = new Date(result.trial.closeDate).setHours(result.hours, result.minutes, 0, 0);

        //   //update the trial in the DB with the same id
        //   this.databaseService.updateTrialDate(result.trial.meetingId, new Date(result.trial.date), new Date(newCloseDate), result.trial.location, result.trial.startTime, result.trial.distance)

        //   // //get the index of the updated element
        //   // var indexOfUpdatedTrial = this.dataSource.data.findIndex(item => item.meetingId == result.trial.meetingId)
        //   // console.log(indexOfUpdatedTrial)

        //  this.updateTableRow(result.trial, this.findIndexOfRow(result.trial));

        
          //update the user
          this.databaseService.updateUser(result.user.uid, result.user.displayName, result.user.email, result.user.role).subscribe(result => {
              
              //show the success message returned from the server
              this.snack.notification(result.body['message'],"OK")

            }, error => {
              

              //show a breif error message to user
              this.snack.notification(`Error updating User: error ${error.status}: ${error.statusText} ${error.error.message}`, "OK")
            })

        
        }

        
      }
  });

  }

  
}
