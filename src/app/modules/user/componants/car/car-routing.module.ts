import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';

const routes: Routes = [
  { path: '', component: CarComponent }, 
  {path: 'consommation-vehicule/:plaque_immatriculation', 
  loadChildren: () => import('../consommation-vehicule/consommation-vehicule.module').then(m => m.ConsommationVehiculeModule)},
  {path:'report/:plaque_immatriculation',loadChildren: () => import('../report/report.module').then(m => m.ReportModule)},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRoutingModule {}