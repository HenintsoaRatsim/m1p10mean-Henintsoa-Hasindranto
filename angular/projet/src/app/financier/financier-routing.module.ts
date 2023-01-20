import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancierComponent } from './financier.component';

const routes: Routes = [{ path: '', component: FinancierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancierRoutingModule { }
