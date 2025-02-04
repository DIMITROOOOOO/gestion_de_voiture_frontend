import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { DriverRoutingModule } from './driver-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';

@NgModule({
  declarations: [DriverComponent],
  imports: [CommonModule, DriverRoutingModule,FormsModule,HttpClientModule],
})
export class DriverModule {}