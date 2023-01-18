import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';
import { FactureFicheComponent } from './facture-fiche/facture-fiche.component';


@NgModule({
  declarations: [
    FactureComponent,
    FactureFicheComponent
  ],
  imports: [
    CommonModule,
    FactureRoutingModule
  ]
})
export class FactureModule { }
