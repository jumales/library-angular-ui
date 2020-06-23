export class Book {
  constructor(
    private _id: number,
    private _ibn: String,
    private _title: string
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
}
