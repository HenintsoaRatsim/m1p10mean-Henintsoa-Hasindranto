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
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request = request.clone({
    //   headers: request.headers.set('authorization', this.authService.token),
    // });
    let jwtToken = request.clone({
      setHeaders: {
        Authorization: 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiYWhhaEBnbWFpbC5jb20iLCJpZCI6IjYzYzNlZGQxMDY1YWM4OTc0NmZlZjI1ZSIsImlhdCI6MTY3Mzc4OTc5M30.3rZ67cMrJW3NO1cJP0ohaR5RgpSHjMlTFLFpHlHaKic'
       
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
