import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppError } from '../../shared/errors/app-error';
import { NotFoundError } from '../../shared/errors/not-found-error';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user = {};
  userCopies: UserCopy[] = [];
  displayedColumns = ['code', 'bookName', 'status', 'date'];

  dataSource: MatTableDataSource<UserCopy>;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          this.userService.get(this.id)
            .subscribe(
              (user) => {
                this.user = user;
                this.userCopies = this.user['Pozajmljivanja'];
                this.dataSource = new MatTableDataSource<UserCopy>(this.userCopies);
              },
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

  getDate(copy) {
    if (copy['DatumDo'] === null) {
      return copy['DatumOd'];
    } else {
      return copy['DatumDo'];
    }
  }
}

export interface UserCopy {
  DatumOd: string;
  DatumDo: string;
  KnjigaID: number;
  NazivKnjige: string;
  SifraPrimerka: number;
}
