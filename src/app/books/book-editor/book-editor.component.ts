import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Book } from '../book/book';
@Component({
  selector: 'book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.css'],
})
export class BookEditorComponent implements OnInit {
  title: String;
  @Input() private _book: Book;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.title = this._book.id === null ? 'Create book' : 'Edit book';
  }

  passOk() {
    this.activeModal.close({ action: 'OK', book: this._book });
  }

  passCancel() {
    this.activeModal.close({ action: 'CLOSE' });
  }

  get book() {
    return this._book;
  }

  set book(value: Book) {
    this._book = value;
  }
}
