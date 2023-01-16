import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    mail: null, 
    mdp: null
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    console.log('User form value is: ', this.form);
    this.authService.logInUser(this.form)
    .subscribe((response) => {
      console.log(response);
      // alert(response.message);
      this.router.navigate(['depot_voiture']);
      // this.navi.goToNavigation();
    });
  }

}
