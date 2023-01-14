import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeUserComponent } from '../user/liste-user/liste-user.component';
import { NavigationComponent } from './navigation.component';

const routes: Routes = [
  { path: 'listeUser', component: ListeUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
