//Purpose: create a snack bar pop up service that shows a snackbar when authError is called


import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  authError() {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000
    });

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(
        tap(_ =>
          this.router.navigate(['/login'])
          )
      )

      .subscribe();
  }

  authorisedError() {
    this.snackBar.open('You must be authorised to view this page!', 'OK', {
      duration: 5000
    });

    // return this.snackBar._openedSnackBarRef
    //   .onAction()
    //   .pipe(
    //     tap(_ =>
    //       this.router.navigate(['/login'])
    //       )
    //   )

    //   .subscribe();
  }

  notification(title: string, action: string) {
    this.snackBar.open(title, action, {
      duration: 5000
    });

    // return this.snackBar._openedSnackBarRef
    //   .onAction()
    //   .pipe(
    //     tap(_ =>
            
    //       )
    //   )
    //   .subscribe();
  }
}
