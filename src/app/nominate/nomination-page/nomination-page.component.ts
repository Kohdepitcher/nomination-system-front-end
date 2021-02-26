
//Angualar imports
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';


//import the database service
import { NominationDatabaseService } from '../../services/nominate-db.service';
import { TrialDateDatabaseService } from "../../date-management/trial-date-database.service";
import { UserManagementDBService, userWithRole } from "../../services/user-management-db.service"

import { MatDialog } from '@angular/material/dialog';
import { SubmitNominationsComponent } from '../../shared/dialogs/submit-nominations.component';

//custom snack service
import {SnackService} from '../../services/snack.service';

//import the auth service
import { AuthService} from '../../shared/services/auth.service';


import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';



@Component({
  selector: 'app-nomination-page',
  templateUrl: './nomination-page.component.html',
  styleUrls: ['./nomination-page.component.scss']
})
export class NominationPageComponent implements OnInit, AfterViewInit {
  
  //properties
  
  //stores the id for the trial meeting from query paramters
  desiredTrialID: string;
  
  //horses array
  horses: HorseEntry[] = [];
  
  //classes array
  classes: HorseClass[] = [
    {value: 'Maiden', viewValue: 'Maiden'},
    {value: 'Class 1', viewValue: 'Class 1'},
    {value: 'Class 2', viewValue: 'Class 2'},
    {value: 'Class 3', viewValue: 'Class 3'},
    {value: 'Class 4', viewValue: 'Class 4'},
    {value: 'Class 5', viewValue: 'Class 5'},
    {value: 'Class 6', viewValue: 'Class 6'},
    {value: 'Open', viewValue: 'Open'}
  ];
  
  //horse ages array
  horseAges: HorseAge[] = [
    // {value: 1, viewValue: '1 Year Old'},
    {value: 2, viewValue: '2 Year Old'},
    {value: 3, viewValue: '3 Year Old'},
    {value: 4, viewValue: '4 Year Old'},
    {value: 5, viewValue: '5 Year Old'},
    {value: 6, viewValue: '6 Year Old'},
    {value: 7, viewValue: '7 Year Old'},
    {value: 8, viewValue: '8 Year Old'},
    {value: 9, viewValue: '9 Year Old'},
    {value: 10, viewValue: '10 Year Old'},
  ]
  
  //selected horse class Option
  selectedHorseClass: string = 'Maiden'
  
  //selecte horse age
  selectedHorseAge: number = 2;
  
  //the selected trial meeting to nominate for
  selectedTrialMeeting: trialMeeting
  
  //list of trainers to select from
  trainerList: userWithRole[] = [];
  
  //the trainer selected for the jumpout nominations
  selectedTrainer: userWithRole
  
  //track the progress of submitting nominations
  progress: number = 0;
  
  isSubmitting: boolean = false;
  
  //store the remaining
  remainingTime: String = "";
  
  // Set the date we're counting down to
  countDownDate: number = new Date().getTime();
  
  // Update the count down every 1 second
  countDownTimer = setInterval(function(that) {
    
    
    // Get today's date and time
    var now: number  = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance: number = that.countDownDate - now;
    
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    that.remainingTime = days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds Left to Nominate";
    
    
    //If the count down is over, write some text 
    if (distance <= 0) {
      clearInterval(that.countDownTimer);
      that.remainingTime = "Nominations Have Closed";
    }
  }, 1000, this);
  
  
  
  //collection of form elements
  entryForm: FormGroup
  nominationsForm: FormGroup
  
  //the columns to show for the entries table
  displayedColumns: string[] = ['status', 'name', 'age', 'class', 'jockey', 'edit'];
  
  //data source for the entries table
  dataSource = new MatTableDataSource(this.horses);
  
  // joined$: Observable<any>
  
  // temp2: Observable<trialMeeting[]>;
  
  
  constructor(private afAuth: AngularFireAuth, 
    private fb: FormBuilder, 
    private router: Router,
    private snack: SnackService,
    public dialog: MatDialog,
    public databaseService: NominationDatabaseService, 
    private meetingDatabaseService: TrialDateDatabaseService,
    private userDatabaseService: UserManagementDBService,
    public authService: AuthService,
    private route: ActivatedRoute) {  }
    
    
    
    ngAfterViewInit() {
      
    }
    
    
    /*
    On initialising the component
    1. get the trialID from the query parameters
    2. get the trial information for trialID
    3. get a list of all trainers from the backend
    */
    ngOnInit() {
      
      //fetch the trial id from query paramters
      this.route.queryParams.subscribe(params => {
        
        //set the trial id for fetching specific trial information
        this.desiredTrialID = params.trialID;
        
        //if no trialID exists in the query params, navigate back to the jumpout list page
        if (params.trialID == undefined) {
          this.router.navigate(["trial_dates"])
        }
        
      }, err => {
        // this.snack.notification(err.message, "OK")
        
        this.router.navigate(["trial_dates"])
        
      });
      
      //fetch the desired trial meeting information if the id isnt missing
      if (this.desiredTrialID != null) {
        
        this.meetingDatabaseService.getSpecificTrialDate(this.desiredTrialID).subscribe(trial => {
          
          // this.upcomingMeetings = trial;
          //store the fetched trial meeting
          this.selectedTrialMeeting = trial;
          
          //set the starting time for the count down timer
          this.countDownDate = new Date(trial.closeDate).getTime();
          
        }, err => {
          this.snack.notification(err.message, "OK")
        })
        
      }
      
      //only need to fetch trainers form the backend if an admin is nominating on behalf of a trainer
      if (this.authService.isUserAdmin) {
        
        //fetch all the trainers from the database
        this.userDatabaseService.getUsersForRole("user").subscribe(users => {
          console.log(users)
          
          //populate the trainerlist array with fetched trainers
          this.trainerList = users
          
        }, err => {
          this.snack.notification(err.message, "OK")
        })
        
      }
      
      this.entryForm = this.fb.group({
        // trainer:[],
        horseName:['', Validators.required],
        horseAge:['', [Validators.required, CustomValidator.numeric ]],
        jockey:[]
      })
      
      this.nominationsForm = this.fb.group({
        
      })
      
    }
    
    
    
    emptyEntries() {
      
      // if (new Date() < this.dateWithOffset()) {
      //   return false
      // }
      
      if (this.horses.length > 0) {
        return false
      } else {
        return true
      }
      
    }
    
    //form getters
    // get trainerName() {
    //   return this.entryForm.get('trainer')
    // }
    
    get horseName() {
      return this.entryForm.get('horseName')
    }
    
    get horseAge() {
      return this.entryForm.get('horseAge')
    }
    
    get jockey() {
      return this.entryForm.get('jockey')
    }
    
    
    addHorseEntry() {
      
      //check if horse name field is valid
      if (this.horseName.value == "" || this.horseName.value == null) {
        return;
      } 
      
      //create a new horse
      var horse = new HorseEntry(this.horseName.value, this.selectedHorseAge, this.selectedHorseClass, this.jockey.value ? "" : "NA");
      
      //push the horse to the horses array
      this.horses.push(horse);
      
      //refresh the datasource
      this.dataSource = new MatTableDataSource(this.horses);
      
      //clear the form elements
      this.horseName.reset();
      this.jockey.reset();
      
      this.selectedHorseAge = 2;
      this.selectedHorseClass = 'Maiden'
    }
    
    //removes an entry from the horses array
    removeHorseEntry(id: number) {
      this.horses.splice(id, 1)
      this.dataSource = new MatTableDataSource(this.horses);
    }
    
    //responsible for submitting the nominations to the server
    //nominations are submitted sequentially from top to bottom
    //does skip a nomination has been submitted as the user can resubmit if an error occurs
    // TODO: kfk
    submitNomination() {
      
      // let submissionObservables: Subscription[] = [];
      
      
      
      const submission = async() => {
        
        //iterate through each horse
        for (const horse of this.horses) {
          
          //if the horse is submitted ignore it
          if (!horse.submitted) {
            
            await new Promise ((resolve, reject) => {

              /*
                  Because this page can be used by trainers and admin staff,
                  the right create nomination method should be user

                  if the user is a trainer, use the normal nomination method  
              */
              if (this.authService.isUserTrainer) {
                
                //make post request to add nominations to server
                this.databaseService.createNomination(this.selectedTrialMeeting.meetingId, horse.jockey, horse.name, horse.age, horse.classLevel).subscribe(res => {
                  
                  //update the progress
                  this.progress = (this.horses.length / this.horses.indexOf(horse)) * 100;
                  
                  //set the current entry to submitted
                  horse.submitted = true;
                  
                  // resolve();
                  
                },
                
                //catch any error
                
                error => {
                  
                  //log the error to the console
                  console.log(error);
                  
                  //incase of an error set the status to false so that trainer can resubmit
                  horse.submitted = false;
                  
                  reject(new Error(error));
                })
                
              }
              
              /*
                  If the user is an admin
                  need to use the other create nomination function that allows a trainerID to be included
              */
              if (this.authService.isUserAdmin) {

                //check that the selected trainer is not null or undefined
                if( this.selectedTrainer == null || this.selectedTrainer == undefined) {
                  
                  this.snack.notification("You must select a trainer from the drop down", "OK")

                  return

                }
                
                //make post request to add nominations to server
                this.databaseService.createNominationForTrainer(this.selectedTrialMeeting.meetingId, this.selectedTrainer.userID, horse.jockey, horse.name, horse.age, horse.classLevel).subscribe(res => {
                  
                  //update the progress
                  this.progress = (this.horses.length / this.horses.indexOf(horse)) * 100;
                  
                  //set the current entry to submitted
                  horse.submitted = true;
                  
                  // resolve();
                  
                },
                
                //catch any error
                
                error => {
                  
                  //log the error to the console
                  console.log(error);
                  
                  //incase of an error set the status to false so that trainer can resubmit
                  horse.submitted = false;
                  
                  reject(new Error(error));
                })
                
              }
              
              
              
              
              
              
            })
            
            
          }
          
        };
        
      }
      
      submission().then(() => {
        //a temp array that contains all the successful nominations
        const allSubmitted = this.horses.every(i => i.submitted);
        
        //determine if all the posts were successful
        if (allSubmitted) {
          
          this.snack.notification("All entries were nominated successfully", "OK")
          
        } else {
          this.snack.notification("Looks like one or more nominations failed, try again. If the issue persists try again in a bit or contact us.", "OK")
        }
      })
      
      
      
      //reset the progress tracker
      this.progress = 0;
      this.isSubmitting = false;
      
      
      
      
      
      
      
      
      //clear array
      //  this.horses.length = 0;
      
    }
    
    //dialog
    openTrialDialog(): void {
      const dialogRef = this.dialog.open(SubmitNominationsComponent, {
        width: '400px',
        data: { horses: this.horses, trialID: this.selectedTrialMeeting.meetingId }
      });
      
      
      
      
      
      
      
      //subscribe to the dialog afterclose notification and grab the result
      dialogRef.afterClosed().subscribe(result => {
        
        // //check to see if there is a result from closing the dialogue
        // if (result) {
        
        //   //if the returned trial meeting is new
        //   if(result.isNew == true) {
        
        //     //create a new close date
        //     //set the hours and minutes from the result passed back from new meeting dialog
        //     //const newCloseDate = new Date(result.trial.closeDate).setHours(result.hours, result.minutes, 0, 0);
        
        //     const tempCloseDate = new Date(result.trial.closeDate);
        
        //     const newCloseDate = new Date(tempCloseDate.getFullYear(), tempCloseDate.getMonth(), tempCloseDate.getDate(), result.hours, result.minutes, 0, 0);
        
        //     //create a new trial date in firestore
        //     this.databaseService.createTrialDate(new Date(result.trial.date), new Date(newCloseDate), result.trial.location, result.trial.startTime, result.trial.distance);
        
        //     this.addTableRow(result.trial);
        
        //   }
        
        //   //else if the returned trial meeting isnt new
        //   else if (result.isNew == false) {
        
        
        //     //create a new close date
        //     //set the hours and minutes from the result passed back from new meeting dialog
        //     // const tempCloseDate = new Date(result.trial.closeDate);
        
        //     // const newCloseDate = new Date(tempCloseDate.getFullYear(), tempCloseDate.getMonth(), tempCloseDate.getDate(), result.hours, result.minutes, 0, 0);
        
        //     const newCloseDate = new Date(result.trial.closeDate).setHours(result.hours, result.minutes, 0, 0);
        
        //     //update the trial in the DB with the same id
        //     this.databaseService.updateTrialDate(result.trial.meetingId, new Date(result.trial.date), new Date(newCloseDate), result.trial.location, result.trial.startTime, result.trial.distance)
        
        //     // //get the index of the updated element
        //     // var indexOfUpdatedTrial = this.dataSource.data.findIndex(item => item.meetingId == result.trial.meetingId)
        //     // console.log(indexOfUpdatedTrial)
        
        //    this.updateTableRow(result.trial, this.findIndexOfRow(result.trial));
        //   }
        
        
        // }
      });
    }
    
  }
  
  //Data Models
  export interface HorseClass {
    value: string;
    viewValue: string;
  }
  
  export interface HorseAge {
    value: number;
    viewValue: string;
  }
  
  export interface NominationEntry {
    age?: number,
    classLevel?: string,
    date?: Date,
    horse?: string,
    jockey?: string,
    trialDateID?: string,
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
  
  export class CustomValidator{
    // Number only validation
    static numeric(control: AbstractControl) {
      let val = control.value;
      
      if (val === null || val === '') return null;
      
      if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };
      
      return null;
    }
  }
  
  interface trialMeeting {
    meetingId: number;
    date: Date;
    closeDate: Date;
    location: string,
    distance: string
  }