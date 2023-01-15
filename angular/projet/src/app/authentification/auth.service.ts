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

  constructor(private userService: UserService) { }

  logUser(form: any){
    return this.userService.login_user(form).pipe(
      tap((response: any) => {
        localStorage.setItem('userToken', response.token);
        // this._isLoggedIn$.next(true);
      })
    );
  }
}
