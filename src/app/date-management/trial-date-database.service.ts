// import { Injectable } from '@angular/core';
// // import { AngularFireAuth } from '@angular/fire/auth';
// // import { AngularFirestore } from '@angular/fire/firestore';
// // import * as firebase from 'firebase/app';
// import { switchMap, map } from 'rxjs/operators';
// import { } 

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

//
import { trialDate } from './trialDate.model';
import { trialMeeting } from './trialMeeting.model';

import * as firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class TrialDateDatabaseService {

  cloudFunctionPath: string = 'http://localhost:5000/rjc-trial-nominations/us-central1/api/trial-meetings'

  // constructor( private db: AngularFirestore) { }
  constructor(private http: HttpClient) {

  }



  //create new trial date
  async createTrialDate(newDate: Date, closeDate: Date, newLocation: string, startTime: string, distance: string) {

    const newTrialMeeting = { date: newDate, closeDate: closeDate, location: newLocation, distance: distance, startTime: startTime }

    return this.http.post<trialMeeting>(`${this.cloudFunctionPath}`,
      newTrialMeeting,
      {
        observe: 'response'
      }
    )

      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          //this.error.next(error.message);
        }
      );

    // return this.db.collection('trialDates').add({

    //   //add the data object
    //   ...data,

    //   //specify the data parts to include in the new doc
    //   date: data.date,
    //   location: data.location
    // });
  }
  //

  // //delete a trial date
  deleteTrialDate(trialMeeetingID: number) {

    let deleteParams = new HttpParams();
    deleteParams = deleteParams.append('meetingId', String(trialMeeetingID));

    return this.http.delete(`${this.cloudFunctionPath}/${trialMeeetingID}`,


      {
        params: deleteParams,
        observe: 'events',
        responseType: 'text'
      })
    // return this.db
    // .collection('trialDates')

    // //the doc in trialDates that matches the dateID that is passed to it
    // .doc(docID)

    // //finallly delete the selected trial date
    // .delete();
  }

  // //update a trial date
  updateTrialDate(dateID: number, newDate: Date, closeDate: Date, newLocation: string, startTime: string, distance: string) {

    const patchTrial: trialMeeting = { meetingId: dateID, date: newDate, closeDate: closeDate, location: newLocation, distance: distance, startTime: startTime }

    return this.http.patch<trialMeeting>(`${this.cloudFunctionPath}/${dateID}`,
      patchTrial,
      {
        observe: 'response'
      }
    )

      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          //this.error.next(error.message);
        }
      );

  }

  //returns trial meetings from DB
  getTrialDates() {

    //return observable containing an array of trial meetings
    //parse the json respone into the trial meeting object
    return this.http.get<trialMeeting[]>(`${this.cloudFunctionPath}`)

      //pipe the data to do any manipulations
      .pipe(

        //catch any errors that may arise while fetching
        catchError(errorResponse => {

          return throwError(errorResponse)
        })
      )

  }

  //get trials meetings between dates
  getTrialMeetingBetweenDates(fromDate: Date, toDate: Date) {

    //parameters
    let params = new HttpParams();
    params = params.append('fromDate', fromDate.toISOString());
    params = params.append('beforeDate', toDate.toISOString())

    //return observable containing an array of trial meetings
    //parse the json respone into the trial meeting object
    return this.http.get<trialMeeting[]>(`${this.cloudFunctionPath}`, {
      params: params
    })

      //pipe the data to do any manipulations
      .pipe(

        //catch any errors that may arise while fetching
        catchError(errorResponse => {

          return throwError(errorResponse)
        })
      )


  }

  //gets all trial meetings from todays date upto number of weeks inclusive
  getUpcomingTrialMeetings(weeks: number) {

    //starting date for range
    var startFromDate = new Date()
    
    //end date for range
    var endDate = new Date()

    //set the end date to todays date plus number of weeks
    //have to multiply weeks by 7 as adding actaully adds days not weeks
    endDate.setDate(new Date().getDate() + (weeks * 7))

    return this.getTrialMeetingBetweenDates(startFromDate, endDate);

  }

  //returns trial meetings from DB
  getSpecificTrialDate(meetingId: string) {

    //let params = new HttpParams();
    //params = params.append('meetingId', ID)

    //return observable containing an array of trial meetings
    //parse the json respone into the trial meeting object
    return this.http.get<trialMeeting>(`${this.cloudFunctionPath}/${meetingId}`,
      //{params: params}
    )

      //pipe the data to do any manipulations
      .pipe(

        //catch any errors that may arise while fetching
        catchError(errorResponse => {

          return throwError(errorResponse)
        })
      )

  }


  //helper methods
  calculateRemainingTime(date: Date) {

    // Get today's date and time
    var now: number  = new Date().getTime();
        
    // Find the distance between now and the count down date
    var distance: number = new Date(date).getTime() - now;
  
    // //console.log(distance);
    // console.log(now)
    // console.log(that.countDownDate)
      
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result
    if (distance < 0) {
      return "Closed";
    } else {
      return days + " Days " + hours + " Hours " + minutes + " Minutes ";// + seconds + " Seconds Left to Nominate";
    }


    
  }




    // // Update the count down every 1 second
    // countDownTimer = setInterval(function( destinationDate: Date) {

    //   // Get today's date and time
    //   var now: number  = new Date().getTime();
        
    //   // Find the distance between now and the count down date
    //   var distance: number = new Date(destinationDate).getTime() - now;
    
    //   // //console.log(distance);
    //   // console.log(now)
    //   // console.log(that.countDownDate)
        
    //   // Time calculations for days, hours, minutes and seconds
    //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    //   // Output the result in an element with id="demo"
    //   return days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds Left to Nominate";
    //   // document.getElementById("countDownLabel").innerHTML = days + " Days " + hours + " Hours "
    //   // + minutes + " Minutes " + seconds + " Seconds Left to Nominate";
        
    //   // If the count down is over, write some text 
    //   // if (distance < 0) {
    //   //   clearInterval(that.countDownTimer);
    //   //   that.remainingTime = "Nominations Have Closed";
    //   //   // document.getElementById("countDownLabel").innerHTML = "Nominations Have Closed";
    //   // }

    // }, 1000, this);


      //returns trial meetings from DB
  getUpComingTrialMeetings() {

    let params = new HttpParams();
    params = params.append('afterDate', Date())

      //return observable containing an array of trial meetings
      //parse the json respone into the trial meeting object
      return this.http.get<trialMeeting[]>(`${this.cloudFunctionPath}/specific/`, {params: params})

      //pipe the data to do any manipulations
      .pipe(

        //catch any errors that may arise while fetching
        catchError(errorResponse => {

          return throwError(errorResponse)
        })
      )

  }

}