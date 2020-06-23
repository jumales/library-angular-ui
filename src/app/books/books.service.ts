import { Book } from '../books/book/book';

export class BooksService {
  getBooks() {
    let books: Book[];

    books = [
      new Book(1, '1234', 'Prva knjiga'),
      new Book(2, '5678', 'Druga knjiga'),
    ];

    return books;
  }
}
