import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksComponent } from './books.component';

const bookRoutes = [
  {
    path: '', component: BooksComponent, children: [

    ]
  }
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
