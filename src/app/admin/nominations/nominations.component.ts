import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNumber } from 'lodash';

//database services
import { TrialDateDatabaseService } from '../../date-management/trial-date-database.service';

//models
import { trialMeeting } from 'src/app/date-management/trialMeeting.model';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.scss']
})
export class NominationsComponent implements OnInit {

  //properties
  jumpoutID: number; //store the jumpout meeting id
  jumpoutMeeting: trialMeeting;



  constructor(public trialDatabaseService: TrialDateDatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {

    //get the jumpout id from the query param
    this.route.queryParams
      //.filter(params => params.trialID)
      .subscribe(params => {

        let jumpoutIDFromQueryParams = parseInt(params.trialID)

        if (!isNumber(jumpoutIDFromQueryParams) && isFinite(jumpoutIDFromQueryParams)) {
          throw new Error('Jumpout ID is not a valid number');
        }

        this.jumpoutID = params.trialID;
      });

      //get the matching jumpout from the server
      this.trialDatabaseService.getSpecificTrialDate(this.jumpoutID.toString()).subscribe(jumpoutMeeting => {

        //set the jumpout meeting to the fetched one
        this.jumpoutMeeting = jumpoutMeeting;

      })

  }

  //returns the passed trial meeting as a formatted string that represents the details of the jumpout
  getMeetingAsSubheading(meeting: trialMeeting): string {

    const optionsWithoutTime = { year: 'numeric', month: 'numeric', day: 'numeric'};

    let location = meeting.location;
    let date = new Date(meeting.date).toLocaleString('en-au', optionsWithoutTime );
    let distance = meeting.distance;
    let time = meeting.startTime;

    return location + " | " + date + " | " + distance + "m | " + time;
  }

}
