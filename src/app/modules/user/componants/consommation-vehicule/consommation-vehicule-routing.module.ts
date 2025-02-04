import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsommationVehiculeComponent } from './consommation-vehicule.component';

const routes: Routes = [
  { path: '', component: ConsommationVehiculeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsommationVehiculeRoutingModule { }
