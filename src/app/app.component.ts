import { Component, AfterViewInit } from '@angular/core';
import { LoaderService } from "./services/http-loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
