import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentification/auth.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.css']
})
export class AjoutUserComponent implements OnInit {


  form: any = {
    nom: null,
    prenom: null,
    mail: null, 
    mdp: null,
    contact: null
  }

  mess: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    console.log('donnee entree: ', this.form);
    this.authService.InscrireUser(this.form)
    .subscribe((response) => {
      // console.log(response);
      this.mess = response.message;
      if(response.role.intitule=='client'){
        this.router.navigate(['Client/depot_voiture']);
      }else{
        this.router.navigate(['']);
      }
   });
  }

}
