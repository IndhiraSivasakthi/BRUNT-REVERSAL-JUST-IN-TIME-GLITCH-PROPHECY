import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError, Observable } from 'rxjs';

export interface AdminLogin {
  id?: number;
  username: string;
  password: string;
  loginTime?: string;
  logoutTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/admin';
  private loggedIn = new BehaviorSubject<boolean>(this.getLoginStatus());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData: AdminLogin = { username, password };

    return this.http.post(`${this.apiUrl}/login`, loginData, { responseType: 'text' }).pipe(
      tap(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminUser', username);
        this.loggedIn.next(true);
      }),
      catchError((error) => throwError(() => error))
    );
  }

 logout(): void {
  const username = localStorage.getItem('adminUser') || '';

  if (username) {
    this.http.post('http://localhost:8080/api/admin/logout', username, {
      responseType: 'text'
    }).subscribe({
      next: () => {
        console.log('Logout time updated on backend');
      },
      error: (err) => {
        console.error('Error during logout:', err);
      }
    });
  }

  localStorage.clear();
  this.loggedIn.next(false);
}


  getLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUsername(): string {
    return localStorage.getItem('adminUser') || '';
  }
} 