import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MaintenanceRequest } from '../../../models/MaintenanceRequest';
import { Nature } from '../../../models/Nature';
@Injectable({
  providedIn: 'root', 
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:8081/api/maintenances'; 

  constructor(private http: HttpClient) {}

  scheduleMaintenance(request: MaintenanceRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/schedule-repair`, request);
  }

  updateMaintenance(id: number, request: MaintenanceRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }

  deleteMaintenance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAllMaintenances(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching maintenance data:', error);
        return throwError(() => new Error('Something went wrong. Please try again later.'));
      })
    );
  }
  getDepensesByVehicule(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.apiUrl}/depenses-by-vehicule`);
  }

  getTotalDepenses(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-depenses`);

  }

  getMaintenancesByNature(nature: Nature): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(`${this.apiUrl}/by-nature?nature=${nature}`);
  }
}