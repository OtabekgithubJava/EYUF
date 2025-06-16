import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserDTO } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5266/api/Auth';

  constructor(private http: HttpClient) {}

  signup(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, formData).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(error => {
        console.error('Signup error:', error);
        let errorMsg = 'Roʻyxatdan oʻtish muvaffaqiyatsiz yakunlandi.';
        if (error.status === 409) {
          errorMsg = 'Bu foydalanuvchi nomi allaqachon band.';
        } else if (error.status === 400) {
          errorMsg = error.error?.error || 'Iltimos, barcha maydonlarni toʻgʻri toʻldiring.';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Password', password);
    return this.http.post(`${this.apiUrl}/login`, formData).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error?.error || 'Invalid credentials'));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.nameid;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}