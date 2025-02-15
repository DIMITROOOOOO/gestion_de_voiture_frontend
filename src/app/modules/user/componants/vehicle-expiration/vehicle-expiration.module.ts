import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleExpirationRoutingModule } from './vehicle-expiration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleExpirationComponent } from './vehicle-expiration.component';


@NgModule({
  declarations: [VehicleExpirationComponent],
  imports: [
    CommonModule,
    VehicleExpirationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehicleExpirationModule { }
