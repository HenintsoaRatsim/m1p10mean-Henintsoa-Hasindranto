import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtelierRoutingModule } from './atelier-routing.module';
import { AtelierComponent } from './atelier.component';
import { FormsModule } from '@angular/forms';
import { AjoutReparationComponent } from './ajout-reparation/ajout-reparation.component';
import { ListeReceptionnerComponent } from './liste-receptionner/liste-receptionner.component';
import { ReceptionVoitureComponent } from './reception-voiture/reception-voiture.component';
import { VoitureEnReparationComponent } from './voiture-en-reparation/voiture-en-reparation.component';


@NgModule({
  declarations: [
    AtelierComponent,
    AjoutReparationComponent,
    ListeReceptionnerComponent,
    ReceptionVoitureComponent,
    VoitureEnReparationComponent
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule,
    FormsModule
  ]
})
export class AtelierModule { }
