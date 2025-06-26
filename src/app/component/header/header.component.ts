import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
  <div class="container-fluid px-3">
    <a class="navbar-brand d-flex align-items-center" routerLink="/">
      <i class="fas fa-book fa-2x me-2"></i>
      <span class="h5 mb-0">Bok Hanterare</span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarButtons" 
      aria-controls="navbarButtons" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarButtons">
      <div class="d-flex flex-column flex-lg-row mt-2 mt-lg-0">
        <a class="btn btn-outline-success me-lg-2 mb-2 mb-lg-0" routerLink="/bocker">
          <i class="fas fa-book fa-lg me-2"></i>Mina böcker
        </a>
        <a class="btn btn-outline-success me-lg-2 mb-2 mb-lg-0" routerLink="/quotes">
          <i class="fa-solid fa-quote-right me-2"></i>Mina citat
        </a>
        <a class="btn btn-outline-success" routerLink="/login">
          <i class="fa-solid fa-right-to-bracket"></i>
        </a>
      </div>
    </div>
  </div>
</nav>


  `
})
export class HeaderComponent {

}
