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
    mail: 'ratsimhenintsoa@gmail.com' , 
    mdp: '123'
  }

  mess: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    console.log('User form value is: ', this.form);
    this.authService.logInUser(this.form)
    .subscribe((response) => {
      console.log(response.message);
      this.mess = response.message;
      if(response.role.intitule=='client'){
        this.router.navigate(['Client/depot_voiture']);
      }else if(response.role.intitule=='atelier'){
        this.router.navigate(['Atelier/reception_voiture']);
      }else if(response.role.intitule=='financier'){
        this.router.navigate(['Financier/liste_paiement']);
      }else{
        this.router.navigate(['']);
      }
      
     
    });
  }

}
