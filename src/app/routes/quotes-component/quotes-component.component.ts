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
    <div class="container mt-4">
      <h2 class="mb-3">Mina citat</h2>

      <form (ngSubmit)="addQuote()" class="mb-4">
        <div class="mb-3">
          <label for="text" class="form-label">Citat</label>
          <textarea id="text" class="form-control" [(ngModel)]="newQuote.text" name="text" required></textarea>
        </div>

        <div class="mb-3">
          <label for="bookTitle" class="form-label">Boktitel</label>
          <input id="bookTitle" class="form-control" [(ngModel)]="newQuote.bookTitle" name="bookTitle" required />
        </div>

        <div class="mb-3">
          <label for="author" class="form-label">Författare</label>
          <input id="author" class="form-control" [(ngModel)]="newQuote.author" name="author" required />
        </div>

        <button type="submit" class="btn btn-primary">Spara citat</button>
      </form>

      <ul class="list-group">
        <li *ngFor="let quote of quotes" class="list-group-item">
          "{{ quote.text }}" <br />
          <small class="text-muted">– {{ quote.author }}, <i>{{ quote.bookTitle }}</i></small>
        </li>
      </ul>
    </div>
  `
})
export class QuotesComponent implements OnInit {
  private http = inject(HttpClient);
  quotes: Quote[] = [];

  newQuote: Quote = {
    text: '',
    bookTitle: '',
    author: ''
  };

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.http.get<Quote[]>('http://localhost:5210/quotes/my').subscribe(data => {
      this.quotes = data;
    });
  }

  addQuote() {
    this.http.post<Quote>('http://localhost:5210/quotes', this.newQuote).subscribe(() => {
      this.newQuote = { text: '', bookTitle: '', author: '' };
      this.loadQuotes();
    });
  }
}
