import { AuthorEditorComponent } from './author-editor/author-editor.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorsService } from './authors.service';
import { Component, Inject } from '@angular/core';
import { Author } from './author/author';
import { DatePipe } from '@angular/common';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Component({
  selector: 'authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent {
  private _authors: any;
  isAdmin: boolean;
  isLogged: boolean;

  constructor(
    public authorsService: AuthorsService,
    public modalService: NgbModal,
    public datePipe: DatePipe,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {
    let token = this.storage.get('IS_ADMIN');
    this.isAdmin = token === 'true';
    this.isLogged = token !== undefined;
    this.getAuthors();
  }

  getAuthors() {
    this.authorsService.getAuthors().subscribe((data: {}) => {
      this._authors = data;
    });
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
            this.authorsService.delete(args[0]).subscribe((result: any) => {
              if (result.status.code === 200) {
                this.getAuthors();
              } else {
                //do error handling
              }
            });
          }
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
          this.authorsService.edit(result.author).subscribe((result: any) => {
            if (result.status.code === 200) {
              this.getAuthors();
            } else {
              //do error handling
            }
          });
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
          this.authorsService.addAuthor(author).subscribe((result: any) => {
            if (result.status.code === 200) {
              this.getAuthors();
            } else {
              //do error handling
            }
          });
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }
}
