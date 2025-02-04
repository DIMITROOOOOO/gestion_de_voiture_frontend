import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../../../models/driver';
@Injectable({
  providedIn: 'root',
})
export class ChauffeurService {
  private apiUrl = 'http://localhost:8081/api/chauffeurs';

  constructor(private http: HttpClient) {}

  getChauffeurs(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  addChauffeur(chauffeur: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, chauffeur);
  }

  updateChauffeur(chauffeurId: number, chauffeur: Driver): Observable<Driver> {
    const url = `${this.apiUrl}/${chauffeurId}`;
    return this.http.put<Driver>(url, chauffeur);
  }

  deleteChauffeur(chauffeurId: number): Observable<void> {
    const url = `${this.apiUrl}/${chauffeurId}`;
    return this.http.delete<void>(url);
  }

  assignChauffeurToVehicle(chauffeurId: number, vehiculeId: number): Observable<void> {
    const url = `${this.apiUrl}/assign/${chauffeurId}/${vehiculeId}`;
    return this.http.post<void>(url, {});
  }
}