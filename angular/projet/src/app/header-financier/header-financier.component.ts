import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-header-financier',
  templateUrl: './header-financier.component.html',
  styleUrls: ['./header-financier.component.css']
})
export class HeaderFinancierComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  OnLogOut(){
    console.log('logout faite');
    this.authService.logOutUser();
    this.router.navigate(['']);
  }

}
