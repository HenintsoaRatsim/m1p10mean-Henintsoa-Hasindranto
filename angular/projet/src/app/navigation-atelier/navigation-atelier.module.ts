import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationAtelierRoutingModule } from './navigation-atelier-routing.module';
import { NavigationAtelierComponent } from './navigation-atelier.component';
import { HeaderAtelierComponent } from '../header-atelier/header-atelier.component';
import { SidebarAtelierComponent } from '../sidebar-atelier/sidebar-atelier.component';
import { FooterAtelierComponent } from '../footer-atelier/footer-atelier.component';


@NgModule({
  declarations: [
    NavigationAtelierComponent,
    HeaderAtelierComponent,
    SidebarAtelierComponent,
    FooterAtelierComponent
  ],
  imports: [
    CommonModule,
    NavigationAtelierRoutingModule
  ]
})
export class NavigationAtelierModule { }
