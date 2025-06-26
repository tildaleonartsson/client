import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { HeaderComponent } from '../../component/header/header.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <h1>Text</h1>
    <h2>Böcker</h2>
    <div *ngFor="let book of books">
      <h3>{{ book.title }} – {{ book.author }}</h3>
      <p>{{ book.description }}</p>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private bookService = inject(BookService);
  books: Book[] = [];

  ngOnInit() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }
}
