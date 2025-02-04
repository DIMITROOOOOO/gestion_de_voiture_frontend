import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GestionnaireService {
  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  // Fetch all drivers
  getDrivers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/drivers`);
  }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vehicules`);
  }

  assignCarToDriver(driverId: number, carId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/drivers/${driverId}/assign-car`, { carId });
  }

  scheduleRepair(carId: number, repairDate: Date, description: string): Observable<any> {
    const requestPayload = {
      vehicule: { vehicule_id: carId }, 
      datePlanifiee: repairDate,
      description: description,
      statut: 'planifie' 
    };
  
    return this.http.post(`${this.baseUrl}/vehicules/${carId}/schedule-repair`, requestPayload);
  }
  addCar(car: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicules`, car);
  }
  
}