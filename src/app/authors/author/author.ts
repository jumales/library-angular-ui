import { Book } from '../../books/book/book';
import { DatePipe } from '@angular/common';
export class Author {
  private _dayOfBirthFormatted: String;
  constructor(
    private _id: Number,
    private _firstName: String,
    private _lastName: String,
    private _fullName: String,
    private _dayOfBirth: Date,
    private _oib: String,
    private _books: Book[]
  ) {}

  get id() {
    return this._id;
  }
  set id(value: Number) {
    this._id = value;
  }

  get firstName() {
    return this._firstName;
  }
  set firstName(value: String) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }
  set lastName(value: String) {
    this._lastName = value;
  }

  get fullName() {
    return this._firstName + ' ' + this.lastName;
  }

  get oib() {
    return this._oib;
  }
  set oib(value: String) {
    this._oib = value;
  }

  get dayOfBirth() {
    return this._dayOfBirth;
  }

  set dayOfBirth(value: Date) {
    this._dayOfBirth = value;
  }

  get books() {
    return this._books;
  }

  set books(value: Book[]) {
    this._books = value;
  }

  get dayOfBirthFormatted() {
    return this._dayOfBirthFormatted;
  }

  set dayOfBirthFormatted(value: String) {
    this._dayOfBirthFormatted = value;
  }
}
