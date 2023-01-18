import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { tap } from 'rxjs/operators';
import { VoitureService } from '../service/voiture.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_NAME= 'userToken';

  get token_user(){
    return localStorage.getItem(this.TOKEN_NAME);
  }

  voitureListe: any;

  constructor(private userService: UserService, private voitureService: VoitureService) { }

  logInUser(form: any){
    return this.userService.login_user(form).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_NAME, response.token);
        // this._isLoggedIn$.next(true);
      })
    );
  }

  InscrireUser(form: any){
    return this.userService.inscrire_user(form).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_NAME, response.token);
        // this._isLoggedIn$.next(true);
      })
    );
  }

  logOutUser(){
      localStorage.removeItem(this.TOKEN_NAME);
      this.voitureService.get_voiture_a_reparer()
      .subscribe(response => {
      this.voitureListe=response.data;
      console.log(response.data);
      // console.log(response.data[0].etat);
    })
  }
}
