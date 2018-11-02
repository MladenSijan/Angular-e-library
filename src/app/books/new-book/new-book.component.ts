import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppErrorHandler } from '../../shared/errors/app-error-handler';
import { AppError } from '../../shared/errors/app-error';
import { NotFoundError } from '../../shared/errors/not-found-error';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      'isbn': new FormControl(null, Validators.required),
      'title': new FormControl(null, Validators.required),
      'genre': new FormControl(null, Validators.required),
      'authors': new FormControl(null, Validators.required),
      'pagesnum': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.bookService.create(this.bookForm.value)
      .subscribe(
        newBook => {
          console.log(newBook);
          this.bookForm.reset();
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log('not found');
          } else {
            throw error;
          }
        }
      );
  }
}
