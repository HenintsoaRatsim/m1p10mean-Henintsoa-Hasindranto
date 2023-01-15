import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.css']
})
export class AjoutUserComponent implements OnInit {


  form: any = {
    mail: null, 
    mdp: null
  }
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    console.log('donnee entree: ', this.form);
    this.userService.inscrire_user(this.form);
  }

}
