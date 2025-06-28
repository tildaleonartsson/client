import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { HeaderComponent } from '../../component/header/header.component';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, RouterModule],
  template: `
    <app-header></app-header>

    <div class="container py-5">
      <div
        class="d-flex justify-content-center align-items-center flex-column mt-5"
        style="min-height: calc(100vh - 300px); padding-top: 0px;"
      >
        <h1 *ngIf="!isLoggedIn">Välkommen, gäst!</h1>
        <p *ngIf="!isLoggedIn" class="text-muted">
          Du kan logga in för att komma åt alla funktioner.
        </p>
      </div>

      <ng-container *ngIf="isLoggedIn">
        <h2 class="text-center mb-4">
          <i class="fas fa-book fa-lg me-2"></i>MinaBöcker
        </h2>

        <div class="row g-4 justify-content-center">
          <div
            class="col-12 col-sm-10 col-md-6 col-lg-4"
            *ngFor="let book of books"
          >
            <div class="card h-100 shadow-sm border-0">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ book.title }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ book.author }}</h6>
                <p class="card-text mb-4">
                  Publicerad: {{ book.publicationDate }}
                </p>

                <div class="mt-auto">
                  <div class="row gx-2">
                    <div class="col-6">
                      <a
                        class="btn btn-outline-primary btn-sm w-100"
                        [routerLink]="['/edit-book', book.id]"
                      >
                        <i class="fa-solid fa-pen-to-square me-1"></i> Redigera
                      </a>
                    </div>
                    <div class="col-6">
                      <button
                        class="btn btn-outline-danger btn-sm w-100"
                        (click)="deleteBook(book.id!)"
                      >
                        <i class="fa-solid fa-trash me-1"></i> Radera
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-5">
          <a class="btn btn-success btn-add-book" routerLink="/add-book">
            <i class="fa-solid fa-plus me-2"></i> Lägg till ny bok
          </a>
        </div>
      </ng-container>
    </div>
  `,

  styles: [
    `
      .btn-add-book i {
        transition: transform 0.3s ease;
      }

      .btn-add-book:hover i {
        transform: rotate(90deg) scale(1.2);
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  private bookService = inject(BookService);
  private authService = inject(AuthService);
  books: Book[] = [];
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.bookService.getBooks().subscribe((data) => (this.books = data));
    }
  }

  deleteBook(id: number) {
    if (confirm('Är du säker på att du vill radera denna bok?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter((book) => book.id !== id);
      });
    }
  }
}
