import { Component, AfterViewInit } from '@angular/core';
import { LoaderService } from "./services/http-loader.service";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  //animations for showing and hiding the progress bar
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.5s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.5s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class AppComponent implements AfterViewInit {
  title = 'RJC Jumpouts';

  isLoading = false;

  

  constructor(public loaderService: LoaderService) { }

  ngAfterViewInit() {
    // this.loaderService.httpProgress().subscribe((status: boolean) => {
    //   if (status) {
    //     // this.renderer.addClass(document.body, 'cursor-loader');
    //     this.isLoading = true
    //   } else {
    //     // this.renderer.removeClass(document.body, 'cursor-loader');
    //     this.isLoading = false
    //   }
    // });
  }
}
