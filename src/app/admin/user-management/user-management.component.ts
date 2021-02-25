import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

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
  showSpinner: boolean = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(
    private databaseService: UserManagementDBService,
    private dialog: MatDialog,
    private snack: SnackService) { }

  ngOnInit() {


  }

  loadTableData() {

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

  ngAfterViewInit() {
    this.loadTableData();
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

        this.databaseService.createsUser(result.user.displayName, result.user.email).subscribe(httpResult => {

          //show the success message returned from the server
          this.snack.notification("Created user: " + httpResult.displayName,"OK")

          // this.updateRowData(httpResult)

          this.loadTableData();

        }, error => {

          //show a breif error message to user
          this.snack.notification(`Error creating User: error ${error.status}: ${error.statusText} ${error.error.message}`, "OK")
        })

        

      }

      //else if the returned trial meeting isnt new
      else if (result.isNew == false) {
        
          //update the user
          this.databaseService.updateUser(result.user.uid, result.user.displayName, result.user.email, result.user.role).subscribe(httpResult => {
              
              //show the success message returned from the server
              this.snack.notification(httpResult.body['message'],"OK")
              
              //send the result of the dialogue as the server doesnt return a user object but instead a message
              // this.updateRowData(result.user as AFUser)

              this.loadTableData();

            }, error => {

              //show a breif error message to user
              this.snack.notification(`Error updating User: error ${error.status}: ${error.statusText} ${error.error.message}`, "OK")
            })

        
        }

        
      }
  });

  }

  //add new row to table
  addRowData(user: AFUser) {

    this.dataSource.data.push(user)
    this.table.renderRows();

  }

  //update table row with new data
  updateRowData(user: AFUser) {

    //find the matching user in the datasource based on the user's uid
    const toBeUpdatedUser = this.dataSource.data.find((element) => {
      return element.uid = user.uid
    })

    //update the properties of the user entry in the datasource with the properties passed back
    toBeUpdatedUser.displayName = user.displayName;
    toBeUpdatedUser.email = user.email;
    toBeUpdatedUser.role = user.role;

    this.table.renderRows();
    

  }

  //delete table row
  deleteRowData(row_obj) {

  }

  
}
