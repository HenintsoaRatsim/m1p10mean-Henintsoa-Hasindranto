import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './authentification/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ListeUserComponent} from './user/liste-user/liste-user.component';

const routes: Routes = [
	{ path: '', component: ListeUserComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
