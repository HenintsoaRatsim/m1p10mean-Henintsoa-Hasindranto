import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationAtelierComponent } from './navigation-atelier.component';

const routes: Routes = [{ path: '', component: NavigationAtelierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationAtelierRoutingModule { }
