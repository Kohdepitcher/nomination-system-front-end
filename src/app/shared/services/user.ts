//models the user object from firebase auth
export interface User {

    //unique id of the user
    uid: string;

    //email address
    email: string;

    //the name of the user
    displayName: string;

    //the url path to the user's profile photo
    //not needed
    photoURL: string;

    //track if the email is verified
    emailVerified: boolean;

    //stores the user role
    //either user | manager | admin
    role: string;

}
