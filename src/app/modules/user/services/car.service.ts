import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../../../models/Vehicule';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:8081/api/vehicules';
  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }

  getCarById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/${id}`);
  }
  getFeesByImmatriculation(immatriculation: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/fees/${immatriculation}`
    );
  }

  createCar(car: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.apiUrl, car);
  }

  updateCar(id: number, car: Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getAvailableVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/available`);
  }
}