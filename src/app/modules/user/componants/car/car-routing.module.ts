import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';

const routes: Routes = [
  { path: '', component: CarComponent }, // Default route for the car module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRoutingModule {}