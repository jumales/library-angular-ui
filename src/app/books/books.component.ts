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
  constructor(booksService: BooksService, public modalService: NgbModal) {
    this._books = booksService.getBooks();
  }

  get books() {
    return this._books;
  }

  add(book: Book) {
    book.id = this._books.length + 1;
    this._books.push(book);
  }

  edit(book: Book) {
    this._books.forEach((b) => {
      if (b.id == book.id) {
        b.ibn = book.ibn;
        b.title = book.title;
      }
    });
  }

  delete(book: Book) {
    this._books = this._books.filter((b) => b.id != book.id);
  }

  openDeleteModal(book: Book) {
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

  openEditModal(book: Book) {
    const modalRef = this.modalService.open(BookEditorComponent);
    modalRef.componentInstance.book = new Book(book.id, book.ibn, book.title);
    modalRef.result
      .then((result) => {
        console.log('result', result);
        if (result.action === 'OK') {
          this.edit(result.book);
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
        console.log('result', result);
        if (result.action === 'OK') {
          this.add(result.book);
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }
}
