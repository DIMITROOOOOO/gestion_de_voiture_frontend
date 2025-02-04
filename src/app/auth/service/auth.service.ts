  import { Injectable } from '@angular/core';
  import { HttpClient ,HttpHeaders} from '@angular/common/http';
  import { Observable, tap } from 'rxjs';
  import { UserDto } from '../../models/user-dto';
  import { Router } from '@angular/router';
  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiUrl = "http://localhost:8081/api/auth"; 
    private apiUrl2 = "http://localhost:8081/api/auth/users";

    constructor(private http: HttpClient, private router: Router) {}

    createUser(user: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(`${this.apiUrl}/signup`, user, { headers });
    }
  
    getUsers(): Observable<UserDto[]> {
      return this.http.get<UserDto[]>(this.apiUrl2);
    }
    updateUser(user: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
    }

    deleteUser(userId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/users/${userId}`);
    }
    login(email: string, password: string): Observable<any> {
      const loginUrl = `http://localhost:8081/api/auth/signin`; 
      const payload = {
        email: email,
        motdepasse: password
      };
      console.log('Sending login request with:', payload); 
      return this.http.post(loginUrl, payload).pipe(
        tap((response: any) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
        })
      );
    }
    isLoggedIn(): boolean {
      return !!localStorage.getItem('currentUser');
    }
  
    logout(): void {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  
    getCurrentUser(): any {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }

  }