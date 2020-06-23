import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { BooksService } from './books/books.service';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    AlertDialogComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [BooksService, NgbModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
