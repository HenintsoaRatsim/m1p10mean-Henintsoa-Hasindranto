import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationFinancierComponent } from './navigation-financier.component';

const routes: Routes = [{ path: '', component: NavigationFinancierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationFinancierRoutingModule { }
