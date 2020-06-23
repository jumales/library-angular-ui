import { AuthorEditorComponent } from './author-editor/author-editor.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorsService } from './authors.service';
import { Component } from '@angular/core';
import { Author } from './author/author';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent {
  private _authors: Author[];

  constructor(
    public authorsService: AuthorsService,
    public modalService: NgbModal,
    public datePipe: DatePipe
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
    const modalRef = this.modalService.open(AuthorEditorComponent);
    modalRef.componentInstance.author = new Author(
      author.id,
      author.firstName,
      author.lastName,
      author.fullName,
      author.dayOfBirth,
      author.oib,
      author.books
    );
    modalRef.componentInstance.author.dayOfBirthFormatted = this.datePipe.transform(
      author.dayOfBirth,
      'yyyy-MM-dd'
    );
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          result.author.dayOfBirth = Date.parse(
            result.author.dayOfBirthFormatted
          );
          this.authorsService.edit(result.author);
          this.getAuthors();
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(AuthorEditorComponent);
    modalRef.componentInstance.author = new Author(
      null,
      null,
      null,
      null,
      null,
      null,
      []
    );
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          let author = result.author;
          author.dayOfBirth = Date.parse(author.dayOfBirthFormatted);
          this.authorsService.addAuthor(author);
          this.getAuthors();
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }
}
