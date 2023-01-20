import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationFinancierRoutingModule } from './navigation-financier-routing.module';
import { NavigationFinancierComponent } from './navigation-financier.component';
import { FooterFinancierComponent } from '../footer-financier/footer-financier.component';
import { HeaderFinancierComponent } from '../header-financier/header-financier.component';
import { SidebarFinancierComponent } from '../sidebar-financier/sidebar-financier.component';



@NgModule({
  declarations: [
    NavigationFinancierComponent,
    HeaderFinancierComponent,
    SidebarFinancierComponent,
    FooterFinancierComponent
  ],
  imports: [
    CommonModule,
    NavigationFinancierRoutingModule
  ]
})
export class NavigationFinancierModule { }
