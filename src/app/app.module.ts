import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './not-found/page-not-found.component';
import { AuthorEditorComponent } from './authors/author-editor/author-editor.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsService } from './authors/authors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { BooksService } from './books/books.service';
import { BooksComponent } from './books/books.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookEditorComponent } from './books/book-editor/book-editor.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StorageServiceModule } from 'ngx-webstorage-service';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AlertDialogComponent,
    BookEditorComponent,
    AuthorsComponent,
    AuthorEditorComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    StorageServiceModule,
  ],
  providers: [BooksService, NgbModal, AuthorsService, DatePipe, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
