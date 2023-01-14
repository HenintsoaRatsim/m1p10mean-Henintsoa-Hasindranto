import { Component } from '@angular/core';
import { AuthService } from './authentification/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'm1p10mean-Henintsoa-Hasindranto';
  constructor(public authService: AuthService){}
}
