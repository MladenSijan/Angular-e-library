import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BooksService } from '../books.service';
import { AppError } from '../../shared/errors/app-error';
import { NotFoundError } from '../../shared/errors/not-found-error';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {

  books: Book[];
  displayedColumns = ['isbn', 'title', 'author', 'pages', 'details'];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BooksService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.bookService.getAll()
      .subscribe(
        books => {
          this.books = books;
          this.dataSource = new MatTableDataSource<Book>(this.books);
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log('not found error');
          } else {
            throw error;
          }
        }
      );
    this.paginator._intl.itemsPerPageLabel = 'Knjiga po stranici';
    this.paginator._intl.previousPageLabel = 'Prethodna stranica';
    this.paginator._intl.nextPageLabel = 'Sledeća stranica';
    this.paginator._intl.firstPageLabel = 'Prva stranica';
    this.paginator._intl.lastPageLabel = 'Poslednja stranica';

  }

  applyFilter(filterValue: string) {
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}

export interface Book {
  KnjigaID: number;
  ISBN: string;
  Naziv: string;
  Autori: string;
  Zanr: string;
  BrojStrana: number;
}

// const BOOK_DATA: Book[] = [
//   {
//     id: 1,
//     isbn: '9781593275846',
//     title: 'Eloquent JavaScript, Second Edition',
//     subtitle: 'A Modern Introduction to Programming',
//     author: 'Marijn Haverbeke',
//     published: '2014-12-14T00:00:00.000Z',
//     publisher: 'No Starch Press',
//     pages: 472,
//   },
//   {
//     id: 2,
//     isbn: '9781449331818',
//     title: 'Learning JavaScript Design Patterns',
//     subtitle: 'A JavaScript and jQuery Developers Guide',
//     author: 'Addy Osmani',
//     published: '2012-07-01T00:00:00.000Z',
//     publisher: 'OReilly Media',
//     pages: 254,
//   },
//   {
//     id: 3,
//     isbn: '9781449365035',
//     title: 'Speaking JavaScript',
//     subtitle: 'An In-Depth Guide for Programmers',
//     author: 'Axel Rauschmayer',
//     published: '2014-02-01T00:00:00.000Z',
//     publisher: 'OReilly Media',
//     pages: 460,
//   },
//   {
//     id: 4,
//     isbn: '9781491950296',
//     title: 'Programming JavaScript Applications',
//     subtitle: 'Robust Web Architecture with Node, HTML5, and Modern JS Libraries',
//     author: 'Eric Elliott',
//     published: '2014-07-01T00:00:00.000Z',
//     publisher: 'OReilly Media',
//     pages: 254,
//   },
//   {
//     id: 5,
//     isbn: '9781593277574',
//     title: 'Understanding ECMAScript 6',
//     subtitle: 'The Definitive Guide for JavaScript Developers',
//     author: 'Nicholas C. Zakas',
//     published: '2016-09-03T00:00:00.000Z',
//     publisher: 'No Starch Press',
//     pages: 352,
//   },
//   {
//     id: 6,
//     isbn: '9781491904244',
//     title: 'You Dont Know JS',
//     subtitle: 'ES6 & Beyond',
//     author: 'Kyle Simpson',
//     published: '2015-12-27T00:00:00.000Z',
//     publisher: 'OReilly Media',
//     pages: 278,
//   },
//   {
//     id: 7,
//     isbn: '9781449325862',
//     title: 'Git Pocket Guide',
//     subtitle: 'A Working Introduction',
//     author: 'Richard E. Silverman',
//     published: '2013-08-02T00:00:00.000Z',
//     publisher: 'OReilly Media',
//     pages: 234,
//   },
//   {
//     id: 8,
//     isbn: '9781449337711',
//     title: 'Designing Evolvable Web APIs with ASP.NET',
//     subtitle: 'Harnessing the Power of the Web',
//     author: 'Glenn Block, et al.',
//     published: '2014-04-07T00:00:00.000Z',
//     publisher: 'OReilly Media',
//     pages: 538,
//   }
// ];
