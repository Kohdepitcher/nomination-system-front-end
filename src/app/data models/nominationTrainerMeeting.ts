import { User } from './user.model';
import { trialMeeting } from '../date-management/trialMeeting.model';

export interface nominationTrainerMeeting {

    
        nominationID: number;
        jockey: string;
        horseName: string;
        horseAge: number;
        horseClass: string;
        isScratched: boolean;
        // "createdAt": "2020-02-17T03:39:10.000Z",
        // "modifiedAt": "2020-02-17T03:39:10.000Z",

        trialDate: trialMeeting;

        // trialDate {
        //     meetingId: number;
        //     date: Date;
        //     closeDate: Date; 
        //     location: string;
        //     startTime: string;
        //     distance: string;
        //     // "createdAt": "2020-02-17T03:34:36.000Z",
        //     // "modifiedAt": "2020-05-18T12:10:20.000Z"
        // };

        user: User;

        // user {
        //     userID: number;
        //     name: string;
        //     UUID: string;
        //     // "createdAt": "2020-03-12T06:07:37.000Z",
        //     // "modifiedAt": "2020-06-21T14:48:50.000Z"
        // };
    

}

// export interface