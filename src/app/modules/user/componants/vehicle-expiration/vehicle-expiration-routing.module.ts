import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleExpirationComponent } from './vehicle-expiration.component';

const routes: Routes = [{ path: '', component: VehicleExpirationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleExpirationRoutingModule { }
