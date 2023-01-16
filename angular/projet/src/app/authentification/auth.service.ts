import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'node_module/rxjs';
import { UserService } from '../service/user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _isLoggedIn$= new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this._isLoggedIn$.asObservable();
  private readonly TOKEN_NAME= 'userToken';

  get token(){
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private userService: UserService) { }

  logUser(form: any){
    return this.userService.login_user(form).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_NAME, response.token);
        // this._isLoggedIn$.next(true);
      })
    );
  }
}
