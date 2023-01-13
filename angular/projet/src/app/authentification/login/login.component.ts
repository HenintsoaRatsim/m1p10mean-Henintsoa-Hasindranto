import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    console.log('User form value is: ', this.form);
    this.http.post('http://localhost:3000/api/user/login', this.form).subscribe(
      data => console.log(data),
      err => console.log(err),
      // this.router.navigate(['/liste-user']);
    )
  }

}
