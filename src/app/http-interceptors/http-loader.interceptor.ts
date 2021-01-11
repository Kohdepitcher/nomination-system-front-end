import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../services/http-loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {

//   private count = 0;

//   constructor(private loaderService: LoaderService) { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (this.count === 0) {
//       this.loaderService.setHttpProgressStatus(true);
//     }
//     this.count++;
//     return next.handle(req).pipe(
//       finalize(() => {
//         this.count--;
//         if (this.count === 0) {
//           this.loaderService.setHttpProgressStatus(false);
//         }
//       }));
//   }

 
     constructor(private loaderService: LoaderService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        this.loaderService.show();
 
        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.loaderService.hide();
                    }
                }, (error) => {
                    this.loaderService.hide();
                })
            );
    }
}

export const LoaderInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
}