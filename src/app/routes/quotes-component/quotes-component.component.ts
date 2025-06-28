import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../component/header/header.component';

interface Quote {
  id?: number;
  text: string;
  bookTitle: string;
  author: string;
}

@Component({
  standalone: true,
  selector: 'app-quotes',
  imports: [CommonModule, HeaderComponent, FormsModule],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      <h2 class="mb-4 text-center">
        <i class="fa-solid fa-quote-right me-2"></i>Mina Citat
      </h2>

      <div class="row g-4">
        <div class="col-md-6 col-xl-4" *ngFor="let quote of quotes">
          <div class="card h-100 shadow-sm border-0 cardanimated">
            <div class="card-body">
              <blockquote class="blockquote mb-3">
                <p class="mb-2">"{{ quote.text }}"</p>
                <footer class="blockquote-footer">
                  {{ quote.author }} i
                  <cite title="Boktitel">{{ quote.bookTitle }}</cite>
                </footer>
              </blockquote>

              <div class="d-flex justify-content-end gap-2">
                <button
                  class="btn btn-sm btn-outline-primary"
                  (click)="startEdit(quote)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  (click)="deleteQuote(quote.id!)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        (ngSubmit)="editQuote ? saveEdit() : addQuote()"
        class="mt-5 card shadow rounded-4 p-4"
      >
        <div class="mb-3">
          <label for="text" class="form-label fw-bold">Citat</label>
          <textarea
            id="text"
            class="form-control"
            [(ngModel)]="currentQuote.text"
            name="text"
            required
            rows="3"
          ></textarea>
        </div>

        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="bookTitle" class="form-label fw-bold">Boktitel</label>
            <input
              id="bookTitle"
              class="form-control"
              [(ngModel)]="currentQuote.bookTitle"
              name="bookTitle"
              required
            />
          </div>

          <div class="mb-3 col-md-6">
            <label for="author" class="form-label fw-bold">Författare</label>
            <input
              id="author"
              class="form-control"
              [(ngModel)]="currentQuote.author"
              name="author"
              required
            />
          </div>
        </div>

        <div [ngClass]="editQuote ? 'd-flex justify-content-end' : ''">
          <button
            type="submit"
            class="btn btn-success"
            [ngClass]="{ 'w-100': !editQuote, 'me-2': editQuote }"
          >
            <i class="fas" [ngClass]="editQuote ? 'fa-save' : 'fa-plus'"></i>
            {{ editQuote ? 'Spara ändringar' : 'Lägg till citat' }}
          </button>

          <button
            *ngIf="editQuote"
            type="button"
            class="btn btn-secondary"
            (click)="cancelEdit()"
          >
            <i class="fas fa-times"></i> Avbryt
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .blockquote-footer {
        font-size: 0.9rem;
        color: #6c757d;
      }
      .cardanimated {
        transition: transform 0.2s ease;
      }
      .cardanimated:hover {
        transform: scale(1.01);
      }
      @media (max-width: 576px) {
        .blockquote p {
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class QuotesComponent implements OnInit {
  private http = inject(HttpClient);
  quotes: Quote[] = [];

  currentQuote: Quote = { text: '', bookTitle: '', author: '' };
  editQuote: Quote | null = null;

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.http
      .get<Quote[]>('http://localhost:5210/quotes/my')
      .subscribe((data) => {
        this.quotes = data;
      });
  }

  addQuote() {
    this.http
      .post<Quote>('http://localhost:5210/quotes', this.currentQuote)
      .subscribe(() => {
        this.currentQuote = { text: '', bookTitle: '', author: '' };
        this.loadQuotes();
      });
  }

  deleteQuote(id: number) {
    if (confirm('Är du säker på att du vill ta bort detta citat?')) {
      this.http.delete(`http://localhost:5210/quotes/${id}`).subscribe(() => {
        this.loadQuotes();
      });
    }
  }

  startEdit(quote: Quote) {
    this.editQuote = { ...quote };
    this.currentQuote = { ...quote };
  }

  saveEdit() {
    if (this.editQuote && this.editQuote.id) {
      this.http
        .put<Quote>(
          `http://localhost:5210/quotes/${this.editQuote.id}`,
          this.currentQuote
        )
        .subscribe(() => {
          this.editQuote = null;
          this.currentQuote = { text: '', bookTitle: '', author: '' };
          this.loadQuotes();
        });
    }
  }

  cancelEdit() {
    this.editQuote = null;
    this.currentQuote = { text: '', bookTitle: '', author: '' };
  }
}
