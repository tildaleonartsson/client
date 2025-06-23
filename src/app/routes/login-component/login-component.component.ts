import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Logga in</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="username" name="username" placeholder="Användarnamn" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Lösenord" required>
      <button type="submit">Logga in</button>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<{ token: string }>('http://localhost:5000/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/');
      },
      error: () => alert('Felaktigt användarnamn eller lösenord')
    });
  }
}
