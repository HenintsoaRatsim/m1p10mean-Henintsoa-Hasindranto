import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // mmethods to communicate with our backend
  
  get_All_User(){
  	let url = environment.USER_BASE_URL+environment.USER.getAllUser; 
  	return this.httpClient.get(url);
  }

  // viewUser(id){

  // }

  // editUser(id, userObj){

  // }

  // delete_User(id){

  // }

  login_user(form: any){
    let url = environment.BASE_URL+'/login'; 
  	return this.httpClient.post(url, form);
  }

}
