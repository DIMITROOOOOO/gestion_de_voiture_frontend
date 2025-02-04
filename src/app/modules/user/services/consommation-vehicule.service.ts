import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsommationVehicule } from '../../../models/consommation-vehicule';
@Injectable({
  providedIn: 'root',
})
export class ConsommationVehiculeService {
  private apiUrl = 'http://localhost:8081/api/consommation-vehicule';

  constructor(private http: HttpClient) {}

  getConsommationByPlaque(plaqueImmatriculation: string): Observable<ConsommationVehicule[]> {
    return this.http.get<ConsommationVehicule[]>(
      `${this.apiUrl}/by-plaque-immatriculation?plaqueImmatriculation=${plaqueImmatriculation}`
    );
  }

  addConsommation(plaqueImmatriculation: string, newConsommation: ConsommationVehicule): Observable<ConsommationVehicule> {
    return this.http.post<ConsommationVehicule>(`${this.apiUrl}/add`, {
      plaqueImmatriculation,
      ...newConsommation,
    });
  }
}