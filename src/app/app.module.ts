import { AuthorsComponent } from './authors/authors.component';
import { AuthorsService } from './authors/authors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { BooksService } from './books/books.service';
import { BooksComponent } from './books/books.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookEditorComponent } from './books/book-editor/book-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AlertDialogComponent,
    BookEditorComponent,
    AuthorsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [BooksService, NgbModal, AuthorsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
