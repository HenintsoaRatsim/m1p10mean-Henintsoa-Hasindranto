import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAtelierComponent } from './navigation-atelier/navigation-atelier.component';
import {LoginComponent} from './authentification/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AjoutUserComponent } from './user/ajout-user/ajout-user.component';
import {ListeUserComponent} from './user/liste-user/liste-user.component';
import { AjoutVoitureComponent } from './voiture/ajout-voiture/ajout-voiture.component';
import { DetailsReparationComponent } from './voiture/details-reparation/details-reparation.component';
import { VoitureHistoriqueComponent } from './voiture/voiture-historique/voiture-historique.component';
import { VoitureReparerComponent } from './voiture/voiture-reparer/voiture-reparer.component';
import { ReceptionVoitureComponent } from './atelier/reception-voiture/reception-voiture.component';
import { AjoutReparationComponent } from './atelier/ajout-reparation/ajout-reparation.component';
import { FactureFicheComponent } from './facture/facture-fiche/facture-fiche.component';
import { ListeReceptionnerComponent } from './atelier/liste-receptionner/liste-receptionner.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{
		path: 'Client',
		component: NavigationComponent,
		children: [
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
				path: 'details_reparation/:idfiche', component: DetailsReparationComponent
			},
			{
				path: 'details_historique/:idfiche', component: DetailsReparationComponent
			},
			{
				path: 'facture_fiche/:idfiche', component: FactureFicheComponent
			}

		]
	},
	{
		path: 'Atelier',
		component: NavigationAtelierComponent,
		children: [
			{
				path: 'reception_voiture', component: ReceptionVoitureComponent
			},
			{
				path: 'ajout_reparation/:idvoiture', component: AjoutReparationComponent
			},
			{
				path: 'liste_reception', component: ListeReceptionnerComponent
			},
		]
	},
	{ path: 'inscription', component: AjoutUserComponent },
	{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
	{ path: 'navigation', loadChildren: () => import('./navigation/navigation.module').then(m => m.NavigationModule) },
	{ path: 'voiture', loadChildren: () => import('./voiture/voiture.module').then(m => m.VoitureModule) },
	{ path: 'navigationAtelier', loadChildren: () => import('./navigation-atelier/navigation-atelier.module').then(m => m.NavigationAtelierModule) },
	{ path: 'facture', loadChildren: () => import('./facture/facture.module').then(m => m.FactureModule) },
	{ path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
