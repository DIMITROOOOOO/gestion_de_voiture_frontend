import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ReportComponent],
  imports: [CommonModule, ReportRoutingModule ,BaseChartDirective,FormsModule],
})
export class ReportModule {}