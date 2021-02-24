import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

export const retryCount = 3;

@Injectable()
export class MonitorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(retryCount)
    )
  }
}

export const RetryInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MonitorInterceptor,
  multi: true
}