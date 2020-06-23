import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Component } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from '../book/book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  private _books: Book[];
  constructor(booksService: BooksService, public modalService: NgbModal) {
    this._books = booksService.getBooks();
  }

  get books() {
    return this._books;
  }

  add(book: Book) {
    this._books.concat(book);
  }

  edit(book: Book) {
    this._books.forEach((b) => {
      if (b.id == book.id) {
        b = new Book(book.id, book.ibn, book.title);
      }
    });
  }

  delete(book: Book) {
    this._books = this._books.filter((b) => b.id != book.id);
  }

  openModal(book: Book) {
    const modalRef = this.modalService.open(AlertDialogComponent);
    modalRef.result
      .then((result) => {
        console.log('result', result);
        if (result === 'OK') {
          this.delete(book);
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }
}
