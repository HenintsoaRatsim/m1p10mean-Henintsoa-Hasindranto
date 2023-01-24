import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancierRoutingModule } from './financier-routing.module';
import { FinancierComponent } from './financier.component';
import { ListePaiementComponent } from './liste-paiement/liste-paiement.component';
import { FormsModule } from '@angular/forms';
import { ListeTermineComponent } from './liste-termine/liste-termine.component';
import { TempsMoyenneComponent } from './temps-moyenne/temps-moyenne.component';
import { ChiffreAffaireComponent } from './chiffre-affaire/chiffre-affaire.component';
import { BeneficeComponent } from './benefice/benefice.component';
import { DepenseComponent } from './depense/depense.component';
import { RechercheComponent } from './recherche/recherche.component';


@NgModule({
  declarations: [
    FinancierComponent,
    ListePaiementComponent,
    ListeTermineComponent,
    TempsMoyenneComponent,
    ChiffreAffaireComponent,
    BeneficeComponent,
    DepenseComponent,
    RechercheComponent
  ],
  imports: [
    CommonModule,
    FinancierRoutingModule,
    FormsModule
  ]
})
export class FinancierModule { }
