/*
Nomination service for interacting with the backend
*/

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

//
//import { trialDate } from './trialDate.model';
import { trialMeeting } from '../date-management/trialMeeting.model';
import { Nomination } from '../nominate/nomination.model';
import { nominationTrainerMeeting} from '../data models/nominationTrainerMeeting'


@Injectable({  providedIn: 'root' })

export class NominationDatabaseService {
  
  nominationPath: string = environment.apiEndPoint + 'nominations'
  trialMeetingPath: string = environment + 'trial-meetings/'
  
  
  constructor (private http: HttpClient) {}
  
  /*
  Create new nomination
  
  This function is intended for a trainer to nominate for themselves
  */
  createNomination(trialMeetingID:number, jockey: string, horseName: string, horseAge: number, horseClass: string) {
    
    //body of request
    const newNomination = {jockey: jockey, horseName: horseName, horseAge: horseAge, horseClass: horseClass, trialMeetingID: trialMeetingID};
    
    return this.http.post<trialMeeting>(`${this.nominationPath}`,
    newNomination,
    {
      observe: 'response'
    }
    )
  }
  
  
  /*
  Create new nomination with trainer ID
  
  This function is intended for an admin to nominate on behalf of a trainer
  */
  createNominationForTrainer(trialMeetingID:number, trainerID: number, jockey: string, horseName: string, horseAge: number, horseClass: string) {
    
    //body of request
    const newNomination = {jockey: jockey, horseName: horseName, horseAge: horseAge, horseClass: horseClass, trialMeetingID: trialMeetingID, trainerID: trainerID};
    
    return this.http.post<trialMeeting>(`${this.nominationPath}/on-behalf-of-trainer`,
    newNomination,
    {
      observe: 'response'
    }
    )
  } 
  
  
  
  //update a trial date
  updateNomination(nominationID: number, jockey: string, horseName: string, horseAge: number, horseClass: string, isScratched: boolean) {
    
    const patchNomination: Nomination = { nominationID: nominationID, jockey: jockey, horseName: horseName, horseAge: horseAge, horseClass: horseClass, isScratched: isScratched, trialMeetingID: 0}
    
    return this.http.patch<trialMeeting>(`${this.nominationPath}/${nominationID}`,
    patchNomination,
    {
      observe: 'response'
    })
    
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
      getNominationsWithTrialID(ID: number) {
        
        let params = new HttpParams();
        params = params.append('trialID', ID.toString())
        
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
        
        getTrainersAnNominationCount(meetingID: number) {
          
          let params = new HttpParams();
          params = params.append('meetingID', meetingID.toString())
          
          return this.http.get<trainerAndCount[]>(`${this.nominationPath}/group-trainers-count/${meetingID}`,
          {params: params}).pipe(
            
            catchError(errorResponse => {
              return throwError(errorResponse)
            })
            )
            
        }
          
          
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
          
          
        }
        
        
        
        
        export interface trainerAndCount {
          name: String;
          count: Number;
        }