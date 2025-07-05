import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../component/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    HttpClientModule,
    RouterModule,
  ],
  template: `
    <app-header></app-header>
    <div
      class="d-flex justify-content-center align-items-center"
      style="min-height: calc(100vh - 80px); padding-top: 0px;"
    >
      <div
        class="card shadow rounded-4 p-4"
        style="width: 100%; max-width: 400px;"
      >
        <h2 class="text-center mb-4 text-success">Logga in</h2>

        <form (ngSubmit)="login()">
          <div class="mb-3">
            <label for="username" class="form-label">Användarnamn</label>
            <input
              [(ngModel)]="username"
              name="username"
              id="username"
              type="text"
              class="form-control"
              placeholder="Skriv ditt användarnamn"
              required
            />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">Lösenord</label>
            <input
              [(ngModel)]="password"
              name="password"
              id="password"
              type="password"
              class="form-control"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
          </div>

          <button type="submit" class="btn btn-outline-success w-100">
            <i class="fa-solid fa-right-to-bracket me-2"></i>Logga in
          </button>
        </form>
        <div class="text-center mt-3">
          <small
            >Har du inget konto?
            <a routerLink="/register">Skapa ett här</a>
          </small>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Logs in the user with the given username and password, and navigates
   * to the root route if the login is successful.
   */
  /*******  6901c1c9-5fa9-4bea-bc8e-dc25c4fe84f9  *******/
  login() {
    this.http
      .post<{ token: string }>(
        'https://server-974x.onrender.com/api/users/login',
        {
          username: this.username,
          password: this.password,
        }
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/');
        },
        error: () => alert('Felaktigt användarnamn eller lösenord'),
      });
  }
}
