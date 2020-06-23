import { Author } from './../../authors/author/author';
export class Book {
  constructor(
    private _id: Number,
    private _ibn: String,
    private _title: String,
    private _authors: Author[]
  ) {}

  get id() {
    return this._id;
  }

  get ibn() {
    return this._ibn;
  }

  get title() {
    return this._title;
  }

  set id(value: Number) {
    this._id = value;
  }

  set ibn(value: String) {
    this._ibn = value;
  }

  set title(value: String) {
    this._title = value;
  }

  set authors(value: Author[]) {
    this._authors = value;
  }

  get authors() {
    if (this._authors === null) {
      this._authors = [];
    }
    return this._authors;
  }
}
