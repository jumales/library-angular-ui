import { Author } from './../author/author';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'author-editor',
  templateUrl: './author-editor.component.html',
  styleUrls: ['./author-editor.component.css'],
})
export class AuthorEditorComponent implements OnInit {
  title: String;
  @Input() private _author: Author;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.title = this._author.id === null ? 'Create author' : 'Edit author';
  }

  passOk() {
    this.activeModal.close({ action: 'OK', author: this._author });
  }

  passCancel() {
    this.activeModal.close({ action: 'CLOSE' });
  }

  get author() {
    return this._author;
  }

  set author(value: Author) {
    this._author = value;
  }
}
