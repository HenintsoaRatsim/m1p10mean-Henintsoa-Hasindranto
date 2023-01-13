import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ListeUserComponent } from './liste-user/liste-user.component';
import { AjoutUserComponent } from './ajout-user/ajout-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';

const routes: Routes = [
  { path: 'liste', component: ListeUserComponent },
  { path: 'ajout', component: AjoutUserComponent },
  { path: 'delete/:id', component: DeleteUserComponent },
  { path: 'modifier/:id', component: ModifierUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
