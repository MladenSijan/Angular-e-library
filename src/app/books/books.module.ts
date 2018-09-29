import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksComponent } from './books.component';
import { BooksService } from './books.service';
import { BooksRoutingModule } from './books-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BooksRoutingModule
  ],
  declarations: [BooksComponent],
  providers: [BooksService]
})
export class BooksModule { }
