import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksComponent } from './books.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';

const bookRoutes = [
  { path: '', component: BooksComponent, children: [
    { path: '', component: BookListComponent },
    { path: 'new', component: NewBookComponent },
    { path: ':id', component: BookDetailsComponent }
  ] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(bookRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BooksRoutingModule { }
