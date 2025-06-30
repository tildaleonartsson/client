import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../component/header/header.component';


@Component({
  standalone: true,
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule, HeaderComponent],
  template: `
    <app-header></app-header>

<div class="container d-flex justify-content-center align-items-center" style="min-height: calc(100vh - 56px); padding-top: 56px;">
  <div class="card shadow rounded-4 p-4" style="width: 100%; max-width: 500px;">
    <h2 class="text-center mb-4 text-success">{{ isEdit ? 'Redigera' : 'Lägg till' }} bok</h2>

    <form (ngSubmit)="submit()">
      <div class="mb-3">
        <label for="title" class="form-label">Titel</label>
        <input [(ngModel)]="book.title" name="title" id="title" type="text" class="form-control" placeholder="Skriv boktitel" required>
      </div>

      <div class="mb-3">
        <label for="author" class="form-label">Författare</label>
        <input [(ngModel)]="book.author" name="author" id="author" type="text" class="form-control" placeholder="Skriv författarens namn" required>
      </div>

      <div class="mb-4">
        <label for="publicationDate" class="form-label">Publiceringsdatum</label>
        <input [(ngModel)]="book.publicationDate" name="publicationDate" id="publicationDate" type="date" class="form-control" required>
      </div>

      <button type="submit" class="btn btn-success w-100">
        <i class="fa-solid fa-floppy-disk me-2"></i>Spara
      </button>
    </form>
  </div>
</div>

  `
})
export class BookFormComponent implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);


book: Book = {
  title: '',
  author: '',
  publicationDate: '',
  userId: ''
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
    this.bookService.updateBook(this.book.id!, this.book).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  } else {
    const userId = this.authService.getCurrentUserId() ?? '';
    this.book.userId = userId;

    this.bookService.addBook(this.book).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
}
