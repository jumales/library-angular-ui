import { environment } from './../../environments/environment.prod';
import { Book } from '../books/book/book';
import { Author } from '../authors/author/author';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class BooksService {
  _books: any = [];

  API_URL = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  get books() {
    return this._books;
  }

  set books(value) {
    this._books = value;
  }

  getBooks(): Observable<Book> {
    return this.http
      .get<Book>(this.API_URL + 'books')
      .pipe(retry(1), catchError(this.handleError));
  }

  addBook(book: Book) {
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

  removeAuthorFromBook(book: Book, author: Author) {
    this._books.forEach((b) => {
      if (b.id == book.id) {
        b.authors = b.authors.filter((a) => a.id !== author.id);
      }
    });
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
