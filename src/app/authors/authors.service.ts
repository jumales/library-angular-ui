import { environment } from './../../environments/environment.prod';
import { Author } from './author/author';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Injectable()
export class AuthorsService {
  _authors: any = [];

  API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  get authors() {
    return this._authors;
  }

  getAuthors(): Observable<Author> {
    return this.http
      .get<Author>(this.API_URL + 'authors')
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

  addAuthor(author: Author) {
    let _author = {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      dayOfBirth: author.dayOfBirthFormatted,
      oib: author.oib,
    };
    return this.http
      .post(this.API_URL + 'authors', JSON.stringify(_author), this.getHeader())
      .pipe(catchError(this.handleError));
  }

  edit(author: Author) {
    let _author = {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      dayOfBirth: author.dayOfBirthFormatted,
      oib: author.oib,
    };
    return this.http
      .put(this.API_URL + 'authors', JSON.stringify(_author), this.getHeader())
      .pipe(catchError(this.handleError));
  }

  delete(author: Author) {
    let _author = {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      dayOfBirth: author.dayOfBirthFormatted,
      oib: author.oib,
    };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.get(environment.TOKEN_KEY),
      }),
      body: _author,
    };
    return this.http
      .delete(this.API_URL + 'authors', options)
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
