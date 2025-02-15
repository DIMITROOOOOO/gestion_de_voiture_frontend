import { Component } from '@angular/core';
import { Vehicule } from '../../../../models/Vehicule'; 
import { DateIntervalDTO } from '../../../../models/DateIntervalDTO';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-expiration',
  templateUrl: './vehicle-expiration.component.html',
  styleUrls: ['./vehicle-expiration.component.css'],
  standalone:false
})
export class VehicleExpirationComponent {
  dateInterval: DateIntervalDTO = {
    dateDebut: new Date(),
    dateFin: new Date()  
  };

  vehicles: Vehicule[] = [];
  errorMessage: string = '';
  searchType: 'assurance' | 'vignette' = 'assurance'; 

  constructor(private carService: CarService) {}

 
  onSearch() {
    const payload: DateIntervalDTO = {
      dateDebut: this.dateInterval.dateDebut, 
      dateFin: this.dateInterval.dateFin      
    };
    const apiCall = this.searchType === 'assurance'
      ? this.carService.getVehiclesByAssuranceExpiration(payload)
      : this.carService.getVehiclesByVignetteExpiration(payload);

    apiCall.subscribe({
      next: (data) => {
        this.vehicles = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching vehicles.';
        console.error(err);
      }
    });
  }
}