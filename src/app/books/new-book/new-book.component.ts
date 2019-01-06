import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppError } from '../../shared/errors/app-error';
import { NotFoundError } from '../../shared/errors/not-found-error';
import { BadInput } from '../../shared/errors/bad-input';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  bookForm: FormGroup;
  bookId;
  book = {};
  isEditMode = false;
  isbn;
  naziv;
  autori;
  zanr;
  brojStrana;

  constructor(
    private bookService: BooksService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      'ISBN': new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(13),
          Validators.pattern(/^\d+$/i)
          // (97(8 | 9)) ?\d{ 9}(\d | X) ISBN pattern
        ]),
      'Naziv': new FormControl(null, Validators.required),
      'Autori': new FormControl(null, Validators.required),
      'Zanr': new FormControl(null, Validators.required),
      'BrojStrana': new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/i)])
    });

    this.route.params
      .subscribe(
        (params: Params) => {
          this.bookId = +params['id'];
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log('not found error');
          } else {
            throw error;
          }
        });

    if (this.bookId) {
      this.isEditMode = true;
      this.book = this.bookService.get(this.bookId)
        .subscribe(
          book => {
            this.book = book;
            this.isbn = book['ISBN'];
            this.naziv = book['Naziv'];
            this.autori = book['Autori'];
            this.zanr = book['Zanr'];
            this.brojStrana = book['BrojStrana'];
          },
          (error: AppError) => {
            if (error instanceof NotFoundError) {
              console.log('not found error');
            } else {
              throw error;
            }
          });
    }
  }

  get ISBN() { return this.bookForm.get('ISBN'); }
  get BrojStrana() { return this.bookForm.get('BrojStrana'); }

  onSubmit() {
    if (this.isEditMode) {
      const book = this.bookForm.value;
      book.KnjigaID = this.book['KnjigaID'];
      this.bookService.update(book)
        .subscribe(
          (editedBook) => {
            this.snackBar.open('Knjiga je uspešno izmenjena', null, {
              duration: 2000,
            }).afterDismissed().subscribe(() => this.router.navigate(['/knjige', editedBook['KnjigaID']]));
          },
          (error: AppError) => {
            if (error instanceof BadInput) {
              this.snackBar.open('Knjiga sa zadatim ISBN brojem već postoji', null, {
                duration: 2000,
              });
            } else {
              this.snackBar.open('Došlo je do greške', null, {
                duration: 2000,
              });
            }
          }
        );
    } else {
      this.bookService.create(this.bookForm.value)
        .subscribe(
          newBook => {
            this.bookForm.reset();
            for (const name in this.bookForm.controls) {
              if (this.bookForm.controls.hasOwnProperty(name)) {
                this.bookForm.controls[name].setErrors(null);
              }
            }
            this.snackBar.open('Knjiga je uspešno dodata', null, {
              duration: 2000,
            });
          },
          (error: AppError) => {
            if (error instanceof BadInput) {
              this.snackBar.open('Knjiga sa zadatim ISBN brojem već postoji', null, {
                duration: 2000,
              });
            } else {
              this.snackBar.open('Došlo je do greške', null, {
                duration: 2000,
              });
            }
            throw error;
          }
        );
    }
  }
}
