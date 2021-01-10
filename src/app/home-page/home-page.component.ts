//angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//data model imports
import { trialMeeting } from '../date-management/trialMeeting.model'

//import the trial date database service
import { TrialDateDatabaseService} from '../date-management/trial-date-database.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  //properties
  fetchedTrials: trialMeeting[];

  //keep track of if the spinner should be shown
  showSpinner: boolean = true;

  constructor(
    private databaseService: TrialDateDatabaseService,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.databaseService.getUpcomingTrialMeetings(6).subscribe(trials => {

      //populate array from fetched meetings
      this.fetchedTrials = trials;

      //stop showing the spinner
      this.showSpinner = false;
    })

  }


  nominateForTrial(id: number) {
    this.router.navigate(['/nominate'], { 
      queryParams: { trialID: id }
    })
  }

}
