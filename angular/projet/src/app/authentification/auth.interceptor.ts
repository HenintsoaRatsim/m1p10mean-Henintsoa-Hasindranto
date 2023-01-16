import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from 'node_modules/@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request = request.clone({
    //   headers: request.headers.set('authorization', this.authService.token),
    // });
    let jwtToken = request.clone({
      setHeaders: {
        Authorization: 'bearer ' + this.authService.token_user,
        token: 'token ' +this.authService.token_user
      }
    })
    return next.handle(jwtToken);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
