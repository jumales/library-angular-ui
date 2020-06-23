import { Book } from '../books/book/book';

export class BooksService {
  _books: Book[] = [
    new Book(1, '1234', 'Prva knjiga'),
    new Book(2, '5678', 'Druga knjiga'),
  ];

  get books() {
    return this._books;
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
}
