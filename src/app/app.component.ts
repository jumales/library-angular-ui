import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { LoginData } from './login/loginData';
import { LoginComponent } from './login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login/login.service';
import { Component, Inject, OnInit } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'library';
  loggedUser = null;
  navbarOpen = false;

  constructor(
    public loginService: LoginService,
    public modalService: NgbModal,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    let token = this.storage.get(environment.TOKEN_KEY);
    if (token != null) {
      this.loggedUser = this.storage.get(environment.USERNAME_KEY);
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  showLogin() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result
      .then((result) => {
        if (result.action === 'OK') {
          this.login(result.loginData);
        }
      })
      .catch((e) => {
        //User canceled nothing to do
      });
  }

  login(loginData: LoginData) {
    this.loginService
      .login(loginData)
      .subscribe((data: { username: ''; token: '' }) => {
        this.handleAfterLogin(data);
      });
  }

  handleAfterLogin(data: { username: ''; token: '' }) {
    this.loggedUser = data.username;
    this.storage.set(environment.USERNAME_KEY, data.username);
    this.storage.set(environment.TOKEN_KEY, data.token);
    this.storage.set(environment.IS_ADMIN_KEY, 'false');
    this.loginService
      .getRoles(data.token)
      .subscribe((myData: { username: ''; roles: [] }) => {
        myData.roles.forEach((role) => {
          if (role === 'ROLE_ADMIN') {
            this.storage.set(environment.IS_ADMIN_KEY, 'true');
          }
        });
        this.refresh();
      });
  }

  refresh() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['books']);
      });
  }

  logout() {
    this.storage.remove(environment.USERNAME_KEY);
    this.storage.remove(environment.TOKEN_KEY);
    this.storage.remove(environment.IS_ADMIN_KEY);
    this.loggedUser = null;

    this.refresh();
  }
}
