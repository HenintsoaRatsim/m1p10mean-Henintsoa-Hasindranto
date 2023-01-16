import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoitureRoutingModule } from './voiture-routing.module';
import { VoitureComponent } from './voiture.component';
import { AjoutVoitureComponent } from './ajout-voiture/ajout-voiture.component';
import { VoitureReparerComponent } from './voiture-reparer/voiture-reparer.component';
import { VoitureHistoriqueComponent } from './voiture-historique/voiture-historique.component';
import { DetailsReparationComponent } from './details-reparation/details-reparation.component';


@NgModule({
  declarations: [
    VoitureComponent,
    AjoutVoitureComponent,
    VoitureReparerComponent,
    VoitureHistoriqueComponent,
    DetailsReparationComponent
  ],
  imports: [
    CommonModule,
    VoitureRoutingModule
  ]
})
export class VoitureModule { }
