import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'car', loadChildren: () => import('./componants/car/car.module').then(m => m.CarModule) },
   { path: 'driver', loadChildren: () => import('./componants/driver/driver.module').then(m => m.DriverModule) },
    { path: 'maintenance', loadChildren: () => import('./componants/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
     { path: 'report', loadChildren: () => import('./componants/report/report.module').then(m => m.ReportModule) },
     { path: 'consommation-vehicule', loadChildren: () => import('./componants/consommation-vehicule/consommation-vehicule.module').then(m => m.ConsommationVehiculeModule) },
     { path: '', redirectTo: 'car', pathMatch: 'full' },
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
