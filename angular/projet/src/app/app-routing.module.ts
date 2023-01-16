import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './authentification/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AjoutUserComponent } from './user/ajout-user/ajout-user.component';
import {ListeUserComponent} from './user/liste-user/liste-user.component';
import { UserComponent } from './user/user.component';
import { AjoutVoitureComponent } from './voiture/ajout-voiture/ajout-voiture.component';
import { DetailsReparationComponent } from './voiture/details-reparation/details-reparation.component';
import { VoitureHistoriqueComponent } from './voiture/voiture-historique/voiture-historique.component';
import { VoitureReparerComponent } from './voiture/voiture-reparer/voiture-reparer.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{
		path: '',
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
				path: 'depot_voiture', component: AjoutVoitureComponent
			},
			{
				path: 'reparation_voiture', component: VoitureReparerComponent
			},
			{
				path: 'mes_historiques', component: VoitureHistoriqueComponent
			},
			{
				path: 'details_reparation', component: DetailsReparationComponent
			}

		]
	},
	{ path: 'inscription', component: AjoutUserComponent },
	{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
	{ path: 'navigation', loadChildren: () => import('./navigation/navigation.module').then(m => m.NavigationModule) },
	{ path: 'voiture', loadChildren: () => import('./voiture/voiture.module').then(m => m.VoitureModule) },
	{ path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
