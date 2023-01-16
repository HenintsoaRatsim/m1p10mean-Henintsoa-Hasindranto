import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavigationComponent } from 'src/app/navigation/navigation.component';

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
    this.authService.logUser(this.form)
    .subscribe((response) => {
      console.log(response);
      // alert(response.message);
      //this.router.navigate(['user/liste']);
      // this.navi.goToNavigation();
    });
  }

}
