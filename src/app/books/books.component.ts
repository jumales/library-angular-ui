import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Component, Inject, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from './book/book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { Author } from '../authors/author/author';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  private _books: any;
  isAdmin: boolean;
  isLogged: boolean;
  constructor(
    public booksService: BooksService,
    public modalService: NgbModal,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    let token = this.storage.get('IS_ADMIN');
    this.isAdmin = token === 'true';
    this.isLogged = token !== undefined;
    this.getBooks();
  }

  ngOnInit() {}

  getBooks() {
    this.booksService.getBooks().subscribe((data: {}) => {
      this._books = data;
    });
  }

  get books() {
    return this._books;
  }

  openRemoveModal(args) {
    const modalRef = this.modalService.open(AlertDialogComponent);
    modalRef.result
      .then((result) => {
        if (result === 'OK') {
          if (args.length === 2) {
            this.booksService
              .removeAuthorFromBook(args[0], args[1])
              .subscribe((result: any) => {
                if (result.status.code === 200) {
                  this.getBooks();
                } else {
                  //do error handling
                }
              });
          } else if (args.length === 1) {
            this.booksService.delete(args[0]).subscribe((result: any) => {
              if (result.status.code === 200) {
                this.getBooks();
              } else {
                //do error handling
              }
            });
          }
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }

  openRemoveAuthorModal(book: Book, author: Author) {
    this.openRemoveModal([book, author]);
  }

  openDeleteModal(book: Book) {
    this.openRemoveModal([book]);
  }

  openEditModal(book: Book) {
    const modalRef = this.modalService.open(BookEditorComponent);
    modalRef.componentInstance.book = new Book(
      book.id,
      book.ibn,
      book.title,
      book.authors
    );
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          this.booksService.edit(result.book).subscribe((result: any) => {
            if (result.status.code === 200) {
              this.getBooks();
            } else {
              //do error handling
            }
          });
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(BookEditorComponent);
    modalRef.componentInstance.book = new Book(null, null, null, []);
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          this.booksService.addBook(result.book).subscribe((result: any) => {
            if (result.status.code === 201) {
              this.getBooks();
            } else {
              //do error handling
            }
          });
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }
}
