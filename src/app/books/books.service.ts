import { environment } from './../../environments/environment.prod';
import { Book } from '../books/book/book';
import { Author } from '../authors/author/author';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable, Inject, OnInit } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Injectable()
export class BooksService implements OnInit {
  _books: any = [];

  API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  ngOnInit() {}

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

  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.get(environment.TOKEN_KEY),
      }),
    };
  }

  addBook(book: Book): Observable<any> {
    let _book = { id: book.id, ibn: book.ibn, title: book.title };
    return this.http
      .post(this.API_URL + 'books', JSON.stringify(_book), this.getHeader())
      .pipe(catchError(this.handleError));
  }

  edit(book: Book) {
    let _book = { id: book.id, ibn: book.ibn, title: book.title };
    return this.http
      .put(this.API_URL + 'books', JSON.stringify(_book), this.getHeader())
      .pipe(catchError(this.handleError));
  }

  delete(book: Book) {
    let _book = { id: book.id, ibn: book.ibn, title: book.title };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.get(environment.TOKEN_KEY),
      }),
      body: _book,
    };
    return this.http
      .delete(this.API_URL + 'books', options)
      .pipe(catchError(this.handleError));
  }

  removeAuthorFromBook(book: Book, author: Author) {
    let _bookAuthor = { bookId: book.id, authorId: author.id };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.get(environment.TOKEN_KEY),
      }),
      body: _bookAuthor,
    };
    return this.http
      .delete(this.API_URL + 'books/deleteAuthorFromBook', options)
      .pipe(catchError(this.handleError));
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
