import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car.component';
import { CarRoutingModule } from './car-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CarComponent],
  imports: [CommonModule,
    CarRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
    ],
})
export class CarModule {}