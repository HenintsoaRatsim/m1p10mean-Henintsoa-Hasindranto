import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListeUserComponent } from './liste-user/liste-user.component';
import { AjoutUserComponent } from './ajout-user/ajout-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';


@NgModule({
  declarations: [
    UserComponent,
    ListeUserComponent,
    AjoutUserComponent,
    DeleteUserComponent,
    ModifierUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
