import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  standalone: true,
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>{{ isEdit ? 'Redigera' : 'Lägg till' }} Bok</h2>
    <form (ngSubmit)="submit()">
      <input [(ngModel)]="book.title" name="title" placeholder="Titel" required>
      <input [(ngModel)]="book.author" name="author" placeholder="Författare" required>
      <textarea [(ngModel)]="book.description" name="description" placeholder="Beskrivning"></textarea>
      <button type="submit">Spara</button>
    </form>
  `
})
export class BookFormComponent implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

book: Book = {
  title: '',
  author: '',
  description: ''
};
  isEdit = false;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEdit = true;
      this.bookService.getBookById(id).subscribe(b => this.book = b);
    }
  }

  submit() {
    if (this.isEdit) {
      this.bookService.updateBook(this.book.id!, this.book).subscribe(() => { // ! = non-null assertion kanske kolla på det om det är fucked up
        this.router.navigateByUrl('/');
      });
    } else {
      this.bookService.addBook(this.book).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
}
