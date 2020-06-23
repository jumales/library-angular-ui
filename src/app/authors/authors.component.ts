import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorsService } from './authors.service';
import { Component } from '@angular/core';
import { Author } from './author/author';

@Component({
  selector: 'authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent {
  private _authors: Author[];

  constructor(
    public authorsService: AuthorsService,
    public modalService: NgbModal
  ) {
    this.getAuthors();
  }

  getAuthors() {
    this._authors = this.authorsService.authors;
  }

  get authors() {
    return this._authors;
  }

  openRemoveModal(args) {
    const modalRef = this.modalService.open(AlertDialogComponent);
    modalRef.result
      .then((result) => {
        if (result === 'OK') {
          if (args.length === 1) {
            this.authorsService.delete(args[0]);
          }
          this.getAuthors();
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }

  openDeleteModal(author: Author) {
    this.openRemoveModal([author]);
  }

  openEditModal(author: Author) {
    /*const modalRef = this.modalService.open(BookEditorComponent);
    modalRef.componentInstance.book = new Book(
      book.id,
      book.ibn,
      book.title,
      book.authors
    );
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          this.booksService.edit(result.book);
          this.getBooks();
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });*/
  }

  openCreateModal() {
    /*const modalRef = this.modalService.open(BookEditorComponent);
    modalRef.componentInstance.book = new Book(null, null, null, []);
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          this.booksService.addBook(result.book);
          this.getBooks();
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });*/
  }
}
