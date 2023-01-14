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

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    console.log('User form value is: ', this.form);
    this.authService.logUser(this.form)
    // this.http.post('http://localhost:3000/login', this.form)
    .subscribe((response) => {
      console.log(response);
      // alert(response.message);
      this.router.navigate(['home'], {relativeTo: this.route});
      // this.navi.goToNavigation();
    }
      // data => console.log(data),
      // err => console.log(err);
      // this.router.navigate(['/liste-user']);
    );
  }

}
