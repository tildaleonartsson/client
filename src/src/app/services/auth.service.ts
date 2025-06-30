import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5210/api/users';

  constructor(private http: HttpClient, private router: Router) {}

login(username: string, password: string): Observable<any> {
  return new Observable(observer => {
    this.http.post<any>(`${this.apiUrl}/login`, { username, password }).subscribe({
      next: (res) => {
        const token = res.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        observer.next(res);
        observer.complete();
      },
      error: (err) => observer.error(err)
    });
  });
}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.sub || null;
    } catch {
      return null;
    }
  }
}
