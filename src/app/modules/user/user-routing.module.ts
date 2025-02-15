import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'car', loadChildren: () => import('./componants/car/car.module').then(m => m.CarModule) },
   { path: 'driver', loadChildren: () => import('./componants/driver/driver.module').then(m => m.DriverModule) },
    { path: 'maintenance', loadChildren: () => import('./componants/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
     { path: 'vehicle-expiration', loadChildren: () => import('./componants/vehicle-expiration/vehicle-expiration.module').then(m => m.VehicleExpirationModule) },
     { path: '', redirectTo: 'car', pathMatch: 'full' },
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
