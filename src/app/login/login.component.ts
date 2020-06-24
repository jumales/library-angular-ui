import { LoginData } from './loginData';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: String;
  @Input() private _loginData: LoginData = { username: '', password: '' };

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  passOk() {
    this.activeModal.close({ action: 'OK', loginData: this._loginData });
  }

  passCancel() {
    this.activeModal.close({ action: 'CLOSE' });
  }

  get loginData() {
    return this._loginData;
  }
}
