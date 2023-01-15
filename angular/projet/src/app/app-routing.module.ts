import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './authentification/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AjoutUserComponent } from './user/ajout-user/ajout-user.component';
import {ListeUserComponent} from './user/liste-user/liste-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{
		path: 'home',
		component: NavigationComponent,
		children: [
			{
				path: 'nav',
				component: UserComponent
			},
			{
				path: 'user/liste', component: ListeUserComponent
			},
			{
				path: 'ajout', component: AjoutUserComponent
			}
		]
	},
	{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
	{ path: 'navigation', loadChildren: () => import('./navigation/navigation.module').then(m => m.NavigationModule) },
	{ path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
