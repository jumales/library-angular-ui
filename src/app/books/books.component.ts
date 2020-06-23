import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Component } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from './book/book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookEditorComponent } from './book-editor/book-editor.component';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  private _books: Book[];
  constructor(
    public booksService: BooksService,
    public modalService: NgbModal
  ) {
    this.getBooks();
  }

  getBooks() {
    this._books = this.booksService.books;
  }

  get books() {
    return this._books;
  }

  openDeleteModal(book: Book) {
    const modalRef = this.modalService.open(AlertDialogComponent);
    modalRef.result
      .then((result) => {
        if (result === 'OK') {
          this.booksService.delete(book);
          this.getBooks();
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }

  openEditModal(book: Book) {
    const modalRef = this.modalService.open(BookEditorComponent);
    modalRef.componentInstance.book = new Book(book.id, book.ibn, book.title);
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          this.booksService.edit(result.book);
          this.getBooks();
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(BookEditorComponent);
    modalRef.componentInstance.book = new Book(null, null, null);
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          this.booksService.addBook(result.book);
          this.getBooks();
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }
}
