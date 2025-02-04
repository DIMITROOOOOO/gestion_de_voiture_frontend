import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [CommonModule, MaintenanceRoutingModule,FormsModule,HttpClientModule],
})
export class MaintenanceModule {}