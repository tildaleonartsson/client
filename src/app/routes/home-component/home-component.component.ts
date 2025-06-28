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

    <div class="container d-flex flex-column align-items-center justify-content-center mt-5">
      <div class="text-center">
        <h1 *ngIf="isLoggedIn">Välkommen tillbaka!</h1>
        <h1 *ngIf="!isLoggedIn">Välkommen, gäst! Logga in för att se mer.</h1>
      </div>

      <ng-container *ngIf="isLoggedIn">
        <button class="btn btn-success mb-4" routerLink="/add-book">
          <i class="fa-solid fa-plus me-2"></i> Lägg till ny bok
        </button>

        <h2 class="mt-4 mb-3">Böcker</h2>
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div class="col" *ngFor="let book of books">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">{{ book.title }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ book.author }}</h6>
                <p class="card-text">Publicerad: {{ book.publicationDate }}</p>

                <div class="d-flex justify-content-end gap-2 mt-3">
                  <a class="btn btn-outline-primary btn-sm" [routerLink]="['/edit-book', book.id]">
                    <i class="fa-solid fa-pen-to-square me-1"></i> Redigera
                  </a>
                  <button class="btn btn-outline-danger btn-sm" (click)="deleteBook(book.id!)">
                    <i class="fa-solid fa-trash me-1"></i> Radera
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private bookService = inject(BookService);
  private authService = inject(AuthService);
  books: Book[] = [];
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.bookService.getBooks().subscribe(data => this.books = data);
    }
  }

  deleteBook(id: number) {
    if (confirm('Är du säker på att du vill radera denna bok?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(book => book.id !== id);
      });
    }
  }
}
