import { Component, AfterViewInit, ViewChildren, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { MatSort, MatTableDataSource  } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';



import { MatDialog } from '@angular/material/dialog';
// import { DateDialogComponent } from '../dialogs/date-dialog.component';
// import {DateMessageDialogComponent} from '../dialogs/date-message-dialog.component'
import { map } from 'rxjs/operators';

//chips
import {MatChipList} from '@angular/material/chips'

import { HttpClient } from '@angular/common/http'
import * as _ from 'lodash';

//data model imports
// import { trialMeeting } from '../trialMeeting.model'

//import the trial date database service
import { NominationDatabaseService } from '../../services/nominate-db.service';
import { TrialDateDatabaseService } from '../../date-management/trial-date-database.service';
import { Nomination } from '../../nominate/nomination.model';

import { ActivatedRoute } from '@angular/router';
import { trialMeeting } from 'src/app/date-management/trialMeeting.model';

import { nominationTrainerMeeting } from './../../data models/nominationTrainerMeeting';
//import 'rxjs/add/operator/filter';


/*
  Requires a trial ID to be passed in as query - this is used to search for nominations related to the specified meeting ID
  
  Shows a list of nominations - id of nomination, horse name, class, age, jockey, scratched status, trainer name
*/

@Component({
  selector: 'app-all-nominations',
  templateUrl: './all-nominations.component.html',
  styleUrls: ['./all-nominations.component.scss']
})
export class AllNominationsComponent implements OnInit {

  //column names for table
  displayedColumns = ['id', 'horseName', 'horseClass', 'horseAge', 'jockey', 'trainer', 'isScratched'];

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

  constructor(public dialog: MatDialog, public databaseService: NominationDatabaseService, public trialDatabaseService: TrialDateDatabaseService, private http: HttpClient, private route: ActivatedRoute) { 

  }

  ngAfterViewInit() {
    
  }

  ngOnInit() {

    this.route.queryParams
      //.filter(params => params.trialID)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.desiredTrialID = params.trialID;
        console.log(this.desiredTrialID); // popular
      });

    //if the desired trial id is not null
    if (this.desiredTrialID != null) {

      this.databaseService.getNominationsWithTrialID(this.desiredTrialID).subscribe(

        //trial meetings
        nominations => {
  
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
    } else {

      //show all nominations
      this.databaseService.getNominations().subscribe(

        //trial meetings
        nominations => {
  
        //set the datasource for table to the trial meeting array that is returned
        this.dataSource = new MatTableDataSource(nominations);
  
        //hide the spinner
        this.showSpinner = false;
  
        console.log(nominations)
        }
      )
    }

    

  }

  trackByUid(index, item) {
    return item.id;
  }

}

