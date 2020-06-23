import { Book } from '../books/book/book';
import { Author } from '../authors/author/author';

export class BooksService {
  _books: Book[] = [
    new Book(1, '1234', 'Prva knjiga', [
      new Author(
        1,
        'Jure',
        'Maleš',
        'Jure Maleš',
        new Date('1987-11-23'),
        '1234',
        []
      ),
      new Author(
        2,
        'Nikolina',
        'Antolić',
        'Nikolina Antolić',
        new Date('1991-11-15'),
        '5678',
        []
      ),
    ]),
    new Book(2, '5678', 'Druga knjiga', [
      new Author(
        1,
        'Nikolina',
        'Antolić',
        'Nikolina Antolić',
        new Date('1991-11-15'),
        '5678',
        []
      ),
    ]),
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

  removeAuthorFromBook(book: Book, author: Author) {
    this._books.forEach((b) => {
      if (b.id == book.id) {
        b.authors = b.authors.filter((a) => a.id !== author.id);
      }
    });
  }
}
