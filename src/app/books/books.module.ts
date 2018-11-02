import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { BooksComponent } from './books.component';
import { BooksService } from './books.service';
import { BooksRoutingModule } from './books-routing.module';
import { NewBookComponent } from './new-book/new-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BooksRoutingModule
  ],
  declarations: [BooksComponent, NewBookComponent, BookDetailsComponent, BookListComponent],
  providers: [BooksService]
})
export class BooksModule { }
