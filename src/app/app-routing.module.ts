import { PageNotFoundComponent } from './not-found/page-not-found.component';
import { AuthorsComponent } from './authors/authors.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  //https://www.djamware.com/post/5d58b409bcc156d4a8a3df8f/angular-8-tutorial-routing-navigation-example
}
