import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-header-atelier',
  templateUrl: './header-atelier.component.html',
  styleUrls: ['./header-atelier.component.css']
})
export class HeaderAtelierComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  OnLogOut(){
    console.log('logout faite');
    this.authService.logOutUser();
    this.router.navigate(['']);
  }

}
