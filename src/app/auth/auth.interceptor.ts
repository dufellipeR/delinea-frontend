import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token!: null;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loggedInUser = this.authService.loggedInUser;
    this.token = JSON.parse(localStorage.getItem('loggedInUser' ) || "");
    if (this.token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    return next.handle(request);
  }
}
