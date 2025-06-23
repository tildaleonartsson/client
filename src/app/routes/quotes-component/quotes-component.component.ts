import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Quote {
  id: number;
  text: string;
  bookTitle?: string;
}

@Component({
  standalone: true,
  selector: 'app-quotes',
  imports: [CommonModule],
  template: `
    <h2>Mina citat</h2>
    <ul>
      <li *ngFor="let quote of quotes">
        "{{ quote.text }}" <i>- {{ quote.bookTitle }}</i>
      </li>
    </ul>
  `
})
export class QuotesComponent implements OnInit {
  private http = inject(HttpClient);
  quotes: Quote[] = [];

  ngOnInit() {
    this.http.get<Quote[]>('http://localhost:5000/quotes/my').subscribe(data => {
      this.quotes = data;
    });
  }
}
