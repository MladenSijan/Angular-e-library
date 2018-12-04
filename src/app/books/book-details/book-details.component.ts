import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { BooksService } from '../books.service';
import { AppError } from '../../shared/errors/app-error';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { ConfirmDeleteDialogComponent } from '../../shared/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { HandoutCopyDialogComponent } from '../../shared/dialogs/handout-copy-dialog/handout-copy-dialog.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BadInput } from '../../shared/errors/bad-input';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  id: number;
  book = {};
  bookCopies = [];
  displayedColumns = ['code', 'status', 'date', 'action'];
  newCopyForm: FormGroup;
  handOutCopyForm: FormGroup;

  dataSource: MatTableDataSource<BookCopy>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          this.bookService.get(this.id)
            .subscribe(
              (book) => {
                this.book = book;
                this.bookCopies = this.book['Primerci'];
                this.paginator._intl.itemsPerPageLabel = 'Primeraka po stranici';
                this.paginator._intl.previousPageLabel = 'Prethodna stranica';
                this.paginator._intl.nextPageLabel = 'Sledeća stranica';
                this.paginator._intl.firstPageLabel = 'Prva stranica';
                this.paginator._intl.lastPageLabel = 'Poslednja stranica';
                this.dataSource = new MatTableDataSource<BookCopy>(this.bookCopies);
                this.dataSource.paginator = this.paginator;
              },
              (error: AppError) => {
                this.snackBar.open('Došlo je do greške', null, {
                  duration: 2000,
                });
                throw error;
              }
            );
        },
        (error: AppError) => {
          this.snackBar.open('Došlo je do greške', null, {
            duration: 2000,
          });
          throw error;
        });

    this.newCopyForm = new FormGroup({
      'newCopy': new FormControl(null, Validators.required)
    });
  }
  get newCopy() { return this.newCopyForm.get('newCopy'); }

  createNewCopy(copyId, bookId) {
    this.bookService.createCopy({ SifraPrimerka: copyId, KnjigaID: bookId })
      .subscribe(
        (copy) => {
          this.newCopyForm.reset();
          this.newCopyForm.get('newCopy').setErrors(null);
          this.bookCopies.push(copy);
          this.paginator._changePageSize(this.paginator.pageSize);
          this.snackBar.open('Primerak uspešno dodat', null, {
            duration: 2000,
          });
        },
        (error: AppError) => {
          if (error instanceof BadInput) {
            this.snackBar.open('Primerak sa zadatom šifrom već postoji', null, {
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

  navigateToEdit(bookId) {
    this.router.navigate(['/books', 'izmena/' + bookId]);
  }

  confirmBookDelete(bookId) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        if (this.bookCopies.find(copy => copy['Pozajmljen'])) {
          this.snackBar.open('Brisanje knjige neuspešno. Nisu vraćeni svi primerci knjige', null, {
            duration: 2000,
          });
        } else {
          this.bookService.delete(bookId)
            .subscribe(
              () => {
                this.router.navigate(['../'], { relativeTo: this.route });
                // notify for snackbar
              },
              (error: AppError) => {
                this.snackBar.open('Došlo je do greške', null, {
                  duration: 2000,
                });
                throw error;
              }
            );
        }
      }
    });
  }

  confirmCopyDelete(copy) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const index = this.bookCopies.indexOf(copy);
        this.bookCopies.splice(index, 1);

        this.bookService.deleteCopy(copy['PrimerakID'])
          .subscribe(
            () => {
              this.paginator._changePageSize(this.paginator.pageSize);
              this.snackBar.open('Primerak uspešno izbrisan', null, {
                duration: 2000,
              });
            },
            (error: AppError) => {
              this.bookCopies.splice(index, 0, copy);

              this.snackBar.open('Došlo je do greške', null, {
                duration: 2000,
              });
              throw error;
            }
          );
      }
    });
  }

  openDialog(bookCopy) {
    this.dialog.open(HandoutCopyDialogComponent, {
      width: '450px',
      data: bookCopy
    }).afterClosed().subscribe(data => {
      if (data) {
        this.bookService.handOutCopy({ PrimerakID: data['PrimerakID'], ClanID: data['ClanID'] })
          .subscribe(
            (modifiedCopy) => {
              const handoutCopy = this.bookCopies.find(copy => {
                return copy['PrimerakID'] === data['PrimerakID'];
              });
              handoutCopy['Pozajmljen'] = true;
              handoutCopy['DatumOd'] = modifiedCopy['DatumOd'];

              this.paginator._changePageSize(this.paginator.pageSize);
              this.snackBar.open('Primerak uspešno izdat', null, {
                duration: 2000,
              });
            },
            (error: AppError) => {
              this.snackBar.open('Došlo je do greške', null, {
                duration: 2000,
              });
              throw error;
            }
          );
      }
    });
  }

  returnCopy(copyId) {
    this.bookService.returnCopy(copyId)
      .subscribe(
        (modifiedCopy) => {
          const returnedCopy = this.bookCopies.find(copy => {
            return copy['PrimerakID'] === modifiedCopy['PrimerakID'];
          });
          returnedCopy['Pozajmljen'] = modifiedCopy['Pozajmljen'];
          returnedCopy['DatumOd'] = '';

          this.paginator._changePageSize(this.paginator.pageSize);
        },
        (error: AppError) => {
          this.snackBar.open('Došlo je do greške', null, {
            duration: 2000,
          });
          throw error;
        }
      );
  }
}

export interface BookCopy {
  PrimerakID: number;
  SifraPrimerka: number;
  Pozajmljen: boolean;
  DatumOd: string;
}
