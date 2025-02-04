import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConsommationVehiculeRoutingModule } from './consommation-vehicule-routing.module';
import { ConsommationVehiculeComponent } from './consommation-vehicule.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConsommationVehiculeComponent],
  imports: [
    CommonModule,
    ConsommationVehiculeRoutingModule ,
    FormsModule,
    RouterModule
    
  ]
})
export class ConsommationVehiculeModule { }
