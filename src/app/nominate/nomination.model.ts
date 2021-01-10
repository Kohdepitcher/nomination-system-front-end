// import { User } from '../data models/user.model'
export class Nomination {

    //Primary key
    nominationID: number;

    //name of the jockey
    jockey: string;

    //name of the horse
    horseName: string;

    //age of the horse
    horseAge: number;

    //class of the horse
    horseClass: string;

    //scratching status of the horse
    isScratched: boolean;

    //Foreign Key
    trialMeetingID: number;


}

