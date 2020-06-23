import { Book } from '../books/book/book';
import { Author } from './author/author';

export class AuthorsService {
  _authors: Author[] = [
    new Author(
      1,
      'Jure',
      'Maleš',
      'Jure Maleš',
      new Date('1987-11-23'),
      '1234',
      [new Book(1, '1234', 'Prva knjiga', [])]
    ),
    new Author(
      2,
      'Nikolina',
      'Antolić',
      'Nikolina Antolić',
      new Date('1991-11-15'),
      '5678',
      [
        new Book(1, '1234', 'Prva knjiga', []),
        new Book(2, '5678', 'Druga knjiga', []),
        new Book(3, '0000', 'Treca knjiga', []),
      ]
    ),
  ];

  get authors() {
    return this._authors;
  }

  addBook(author: Author) {
    author.id = this._authors.length + 1;
    this._authors.push(author);
  }

  edit(author: Author) {
    this._authors.forEach((a) => {
      if (a.id == author.id) {
        a.dayOfBirth = author.dayOfBirth;
        a.firstName = author.firstName;
        a.lastName = author.lastName;
        a.oib = author.oib;
      }
    });
  }

  delete(author: Author) {
    this._authors = this._authors.filter((a) => a.id != author.id);
  }
}
