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
//import { trialDate } from './trialDate.model';
import { trialMeeting } from '../date-management/trialMeeting.model';
import { Nomination } from '../nominate/nomination.model';
import { nominationTrainerMeeting} from '../data models/nominationTrainerMeeting'


@Injectable({  providedIn: 'root' })

export class NominationDatabaseService {

  nominationPath: string = 'http://localhost:5000/rjc-trial-nominations/us-central1/api/nominations'
  trialMeetingPath: string = 'http://localhost:5000/rjc-trial-nominations/us-central1/api/trial-meetings/'

  // constructor( private db: AngularFirestore) { }
  constructor (private http: HttpClient) {

  }



  //create new trial date
  createNomination(trialMeetingID:number, jockey: string, horseName: string, horseAge: number, horseClass: string) {


      const newNomination = {jockey: jockey, horseName: horseName, horseAge: horseAge, horseClass: horseClass, trialMeetingID: trialMeetingID};

      return this.http.post<trialMeeting>(`${this.nominationPath}`,
      newNomination,
      {
        observe: 'response'
      }
    )

    // .subscribe(
    //   responseData => {
    //     console.log(responseData);
    //   },
    //   error => {
    //     //this.error.next(error.message);
    //   }
    // );
    }
  //

  //delete a trial date
    deleteNomination(nominationID: number) {

    let deleteParams = new HttpParams();
    deleteParams = deleteParams.append('nominationId', String(nominationID));

    return this.http.delete(`${this.nominationPath}/${nominationID}`,
    
    {
      params: deleteParams,
      observe: 'events',
      responseType: 'text'
    })
  }

  //update a trial date
  updateNomination(nominationID: number, jockey: string, horseName: string, horseAge: number, horseClass: string, isScratched: boolean, trialMeetingID: number) {

    const patchTrial: Nomination = { nominationID: nominationID, jockey: jockey, horseName: horseName, horseAge: horseAge, horseClass: horseClass, isScratched: isScratched, trialMeetingID: trialMeetingID}

    return this.http.patch<trialMeeting>(`${this.nominationPath}/${nominationID}`,
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

    // return this.db
    //   .collection('trialDates')
    //   .doc(dateID)
    //   .update({
    //     date: newDate,
    //     location: newLocation
    //   })
  }

   //returns trial meetings from DB
   getNominations() {

    //let params = new HttpParams();
    //params = params.append('afterDate', Date())

      //return observable containing an array of trial meetings
      //parse the json respone into the trial meeting object
      return this.http.get<nominationTrainerMeeting[]>(`${this.nominationPath}`, 
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

     //returns trial meetings from DB
     getNominationsWithTrialID(ID: string) {

      let params = new HttpParams();
      params = params.append('trialID', ID)
  
        //return observable containing an array of trial meetings
        //parse the json respone into the trial meeting object
        return this.http.get<nominationTrainerMeeting[]>(`${this.nominationPath}`, 
        {params: params}
        )
  
        //pipe the data to do any manipulations
        .pipe(
  
          //catch any errors that may arise while fetching
          catchError(errorResponse => {
  
            return throwError(errorResponse)
          })
        )
  
    }



}