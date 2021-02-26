import { Component, AfterViewInit, ViewChildren, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';


import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireAuth } from '@angular/fire/auth';




// import { DateDialogComponent } from '../dialogs/date-dialog.component';
// import {DateMessageDialogComponent} from '../dialogs/date-message-dialog.component'
import { map } from 'rxjs/operators';

//chips
import {MatChipList} from '@angular/material/chips'

import { HttpClient } from '@angular/common/http'
// import * as _ from 'lodash';

//data model imports
// import { trialMeeting } from '../trialMeeting.model'

//import the trial date database service
import { NominationDatabaseService } from '../../../services/nominate-db.service';
import { TrialDateDatabaseService } from '../../../date-management/trial-date-database.service';
import { Nomination } from '../../../nominate/nomination.model';

import { ActivatedRoute } from '@angular/router';
import { trialMeeting } from 'src/app/date-management/trialMeeting.model';

import { nominationTrainerMeeting } from '../../../data models/nominationTrainerMeeting';
import { User } from 'src/app/data models/user.model';

//edit nomination dialog
import { EditNominationDialogComponent } from "./edit-nomination-dialog/edit-nomination-dialog.component";
import { MatDialog } from '@angular/material/dialog';

//custom snack service
import {SnackService} from '../../../services/snack.service';

/*  
  Shows a list of nominations - id of nomination, horse name, class, age, jockey, scratched status, trainer name
*/

@Component({
  selector: 'app-all-nominations',
  templateUrl: './all-nominations.component.html',
  styleUrls: ['./all-nominations.component.scss']
})
export class AllNominationsComponent implements OnInit {

  //set by a parent component
  @Input('jumpoutID') jumpoutID: number;

  //column names for table
  displayedColumns = ['horseName', 'horseClass', 'horseAge', 'jockey', 'trainer', 'isScratched', 'edit'];

  //table datasource
  dataSource: MatTableDataSource<nominationTrainerMeeting>;

  //keep track of if the spinner should be shown
  showSpinner: boolean = true;

  //store instance of subscription
  databaseSubscription: Subscription;

  //shows nominations from specific trial id
  desiredTrialID: string;

  //list of trial meetings

  //
  associatedTrialMeeting: trialMeeting

  // @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public databaseService: NominationDatabaseService, public trialDatabaseService: TrialDateDatabaseService, private http: HttpClient, private route: ActivatedRoute, private snack: SnackService) { 

  }

  ngAfterViewInit() {
    
  }

  ngOnInit() {

    // this.route.queryParams
    //   //.filter(params => params.trialID)
    //   .subscribe(params => {
    //     console.log(params); // {order: "popular"}

    //     this.desiredTrialID = params.trialID;
    //     console.log(this.desiredTrialID); // popular
    //   });

    // //if the desired trial id is not null
    // if (this.desiredTrialID != null) {

      this.databaseService.getNominationsWithTrialID(this.jumpoutID).subscribe(

        //trial meetings
        nominations => {

          // let v = _(nominations)
          // .chain()
          // .groupBy(nominations[0].user.name)
          // .value()

          // var result = _.countBy(nominations, 'NominationTrainerMeeting.user.name')

          // console.log(result)

          // var result: trainerAndCount[] = _(nominations)
          // .groupBy('user.name')
          // .mapValues((item, name) => {
          //   // return _.countBy(item, 'trialDate')
          //   return {name: name, count: item.length}
          // })

          // // .map(function(item, itemID) {
          // //   var obj = {};
          // //   obj[itemID] = _.countBy(item)
          // //   return obj
          // // })
          // .valuesIn()
          // .value()



          

          

          // console.log(result);
          // console.log(result[0]);
          
          
        
  
        //set the datasource for table to the trial meeting array that is returned
        this.dataSource = new MatTableDataSource(nominations);
  
        //hide the spinner
        this.showSpinner = false;
  
        console.log(nominations)
        }
      )

      this.trialDatabaseService.getSpecificTrialDate(this.desiredTrialID).subscribe(

        //trial meetings
        trial => {
  
        //set the datasource for table to the trial meeting array that is returned
        this.associatedTrialMeeting = trial;
  
  
        console.log(trial)
        }
      )
    // } else {

    //   //show all nominations
    //   this.databaseService.getNominations().subscribe(

    //     //trial meetings
    //     nominations => {

          
          
  
    //     //set the datasource for table to the trial meeting array that is returned
    //     this.dataSource = new MatTableDataSource(nominations);
  
    //     //hide the spinner
    //     this.showSpinner = false;
  
    //     console.log(nominations)
    //     }
    //   )
    // }

    

  }

  trackByUid(index, item) {
    return item.id;
  }

  //opens the edit nomination dialog
  openEditNominationDialog(nomination: nominationTrainerMeeting): void {

    //open the edit dialog but also store a reference of it
    const dialogRef = this.dialog.open(EditNominationDialogComponent, {
      width: '400px',
      data: nomination
    });

    //subscribe to the dialog afterClose notification and grab the result
    dialogRef.afterClosed().subscribe(modifiedNomination => {
      console.log(modifiedNomination)

      this.databaseService.updateNomination(modifiedNomination.nominationID, modifiedNomination.jockey, modifiedNomination.horseName, modifiedNomination.horseAge, modifiedNomination.horseClass, modifiedNomination.isScratched).subscribe(result => {
        this.snack.notification("Updated Nomination", "OK")
      }, error => {
        this.snack.notification(`Error updating nomination ${error.error.message}`, "OK")
      })
    })

  }

}

interface trainerAndCount {
  name: String;
  count: Number;
}

