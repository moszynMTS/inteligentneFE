import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
token: any = localStorage.getItem('token');

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.token}`
        }
      });
    }

    return next.handle(request);
  }
}
