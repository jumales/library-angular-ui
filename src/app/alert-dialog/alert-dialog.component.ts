import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent implements OnInit {
  //https://medium.com/@izzatnadiri/how-to-pass-data-to-and-receive-from-ng-bootstrap-modals-916f2ad5d66e

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  passOk() {
    this.activeModal.close('OK');
  }
  passCancel() {
    this.activeModal.close('CANCEL');
  }
}
