export class Book {
  constructor(
    private _id: Number,
    private _ibn: String,
    private _title: String
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
}
