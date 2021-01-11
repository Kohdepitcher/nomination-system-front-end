
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

//data model
import { AFUser } from '../data models/AFUser.model';


@Injectable({  providedIn: 'root' })

export class UserManagementDBService {

  APIPath: string = 'http://localhost:5000/rjc-trial-nominations/us-central1/api/users'

  // constructor( private db: AngularFirestore) { }
  constructor (private http: HttpClient) {

  }

  //get all users
  getAllUsers() {

    //return observable containing an array of users
    //parse the json respone into the trial meeting object
    return this.http.get<AFUser>(`${this.APIPath}`)

      //pipe the data to do any manipulations
      .pipe(

          /*
              This request returns an array of nested users with matching db records

              Therefore it needs to be mapped twice to get the nested user object to then be built up into an array

              users": [
                        {
                          "user": {
                              "uid": "",
                              "email": "",
                              "displayName": "",
                              "role": "",
                              "lastSignInTime": "",
                              "creationTime": ""
                          },
                           "db": {
                           }
          */
          
        //map the response error
        map(responseData => {

          //map the root level array json key 'users'
          return responseData['users'].map(item => {

            //create an user using the next level json key
            //combine these into a array of users to be returned to the calling funciton
            // return <AFUser[]>item['user']
            return <AFUser[]>item
          })
          
        }),
      
        //catch any errors that may arise while fetching
        catchError(errorResponse => {

          return throwError(errorResponse)
        })
      )
  }

  //get specific user

  //create new user
  createsUser(name: string, email: string) {

    const newUser: AFUser = { displayName: name, email: email }

    return this.http.post<AFUser>(`${this.APIPath}`, newUser, { observe: 'response' }).pipe(

        //map the response into an AFUser ob
        map(responseData => {
          
          return <AFUser>responseData.body['user'];

        })
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

  //update user
  updateUser(userID: string, name: string, email:string, role: string) {

    //init a user
    const patchUser: AFUser = { displayName: name, email: email, role: role}

    //patch the user with specificed ID
    return this.http.patch<AFUser>(`${this.APIPath}/${userID}`,
      patchUser,
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

  //delete user
  deleteUser(userID: string) {

    return this.http.delete(`${this.APIPath}/${userID}`);

  }
}

