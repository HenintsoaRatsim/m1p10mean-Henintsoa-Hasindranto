import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAtelierComponent } from '../sidebar-atelier/sidebar-atelier.component';
import { AtelierRoutingModule } from './atelier-routing.module';
import { AtelierComponent } from './atelier.component';
import { HeaderAtelierComponent } from '../header-atelier/header-atelier.component';
import { FooterAtelierComponent } from '../footer-atelier/footer-atelier.component';


@NgModule({
  declarations: [
    AtelierComponent,
    HeaderAtelierComponent,
    SidebarAtelierComponent,
    FooterAtelierComponent,
  ],
  imports: [
    CommonModule,
    AtelierRoutingModule
  ]
})
export class AtelierModule { }
