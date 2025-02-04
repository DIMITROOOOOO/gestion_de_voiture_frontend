import { Component, OnInit } from '@angular/core';
import { Statut } from '../../../../models/statut';
import { MaintenanceRequest } from '../../../../models/MaintenanceRequest';
import { MaintenanceService } from '../../services/maintenance.service';
import { Nature } from '../../../../models/Nature';
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
  standalone:false
})
export class MaintenanceComponent implements OnInit {
  maintenanceRequest: MaintenanceRequest = {
    vehiculeId: 0,
    datePlanifiee: new Date(),
    description: '',
    statut: Statut.planifie,
    depense: 0,
    nature: Nature.maintenance_preventive, 
    type: '', 
  };

  Statut = Statut;
  Nature = Nature; 

  constructor(private maintenanceService: MaintenanceService) {}

  ngOnInit(): void {}

  scheduleMaintenance(): void {
    this.maintenanceService.scheduleMaintenance(this.maintenanceRequest).subscribe({
      next: (response) => {
        console.log('Maintenance scheduled successfully:', response);
        alert('Maintenance scheduled successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error scheduling maintenance:', error);
        alert('Failed to schedule maintenance. Please try again.');
      },
    });
  }

  resetForm(): void {
    this.maintenanceRequest = {
      vehiculeId: 0,
      datePlanifiee: new Date(),
      description: '',
      statut: Statut.planifie,
      depense: 0,
      nature: Nature.maintenance_preventive, 
      type: '', 
    };
  }
}
