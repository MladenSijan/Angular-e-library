import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { AppError } from '../../shared/errors/app-error';
import { NotFoundError } from '../../shared/errors/not-found-error';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  displayedColumns = ['jmbg', 'ime', 'prezime', 'email', 'details'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getAll()
      .subscribe(
        users => {
          this.users = users;
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.paginator = this. paginator;
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
  }

  applyFilter(filterValue: string) {
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}

export interface User {
  ClanID: number;
  Jmbg: string;
  Ime: string;
  Prezime: string;
  BrojTelefona: string;
  EmailAdresa: string;
  PostanskaAdresa: string;
}
