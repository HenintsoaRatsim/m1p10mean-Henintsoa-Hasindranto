import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
