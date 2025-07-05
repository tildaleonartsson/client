import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div
      class="container d-flex justify-content-center align-items-center min-vh-100"
    >
      <div class="card shadow p-4 w-100" style="max-width: 400px;">
        <h2 class="text-center mb-4">Skapa konto</h2>

        <form (ngSubmit)="onRegister()" #registerForm="ngForm" novalidate>
          <div class="mb-3">
            <label for="username" class="form-label">Användarnamn</label>
            <input
              type="text"
              id="username"
              name="username"
              class="form-control"
              [(ngModel)]="username"
              required
              minlength="3"
              #usernameInput="ngModel"
            />
            <div
              *ngIf="usernameInput.invalid && usernameInput.touched"
              class="text-danger small"
            >
              Användarnamnet måste vara minst 3 tecken.
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Lösenord</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              [(ngModel)]="password"
              required
              minlength="5"
              #passwordInput="ngModel"
            />
            <div
              *ngIf="passwordInput.invalid && passwordInput.touched"
              class="text-danger small"
            >
              Lösenordet måste vara minst 5 tecken.
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
            [disabled]="registerForm.invalid"
          >
            Skapa konto
          </button>

          <div *ngIf="errorMessage" class="alert alert-danger mt-3 mb-0">
            {{ errorMessage }}
          </div>

          <div class="text-center mt-3">
            <small>
              Har du redan ett konto?
              <a routerLink="/login">Logga in här</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  errorMessage = '';

  onRegister() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        console.error('Registreringsfel:', err); // Bra för felsökning i konsolen

        this.errorMessage =
          err.error?.message || err.error || 'Registrering misslyckades.';
      },
    });
  }
}
