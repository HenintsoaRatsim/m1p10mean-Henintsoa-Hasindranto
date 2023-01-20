import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancierRoutingModule } from './financier-routing.module';
import { FinancierComponent } from './financier.component';
import { ListePaiementComponent } from './liste-paiement/liste-paiement.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FinancierComponent,
    ListePaiementComponent
  ],
  imports: [
    CommonModule,
    FinancierRoutingModule,
    FormsModule
  ]
})
export class FinancierModule { }
