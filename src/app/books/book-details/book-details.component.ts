import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { BooksService } from '../books.service';
import { AppError } from '../../shared/errors/app-error';
import { NotFoundError } from '../../shared/errors/not-found-error';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book = {};
  id: number;

  constructor(private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          this.bookService.get(this.id)
            .subscribe(
              (book) => { this.book = book; },
              (error: AppError) => {
                if (error instanceof NotFoundError) {
                  this.router.navigate(['/not-found']);
                  console.log('not found error');
                } else {
                  throw error;
                }
              }
            );
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            this.router.navigate(['/not-found']);
            console.log('not found error');
          } else {
            throw error;
          }
        });
  }

}
