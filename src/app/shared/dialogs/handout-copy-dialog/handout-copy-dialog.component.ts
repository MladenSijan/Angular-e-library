import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocomplete, MatSnackBar, MatInput } from '@angular/material';
import { UsersService } from '../../../users/users.service';
import { AppError } from '../../errors/app-error';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-handout-copy-dialog',
  templateUrl: './handout-copy-dialog.component.html',
  styleUrls: ['./handout-copy-dialog.component.scss']
})
export class HandoutCopyDialogComponent implements OnInit {

  users = [];
  filteredUsers = [];
  userInput;
  handoutCopyForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<HandoutCopyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UsersService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userService.getAll()
      .subscribe(
        users => {
          this.users = users;
          this.filteredUsers = this.users.slice();
        },
        (error: AppError) => {
          this.snackBar.open('Došlo je do greške', null, {
            duration: 2000,
          });
          throw error;
        }
      );

    this.handoutCopyForm = new FormGroup({
      'user': new FormControl(null, Validators.required)
    });

    this.handoutCopyForm.get('user').valueChanges
      .subscribe(
        value => {
          this.filteredUsers = this.filter(value);
          const selectedUser = this.filteredUsers
            .find(
              user => user['Ime'].concat(' ', user['Prezime']) === value
                      || user['Ime'].concat(' ', user['Prezime']).toLowerCase() === value
            );
          if (selectedUser) {
            this.userInput = selectedUser['Ime'] + ' ' + selectedUser['Prezime'];
            this.data['ClanID'] = selectedUser['ClanID'];
          } else {
            this.handoutCopyForm.get('user').setErrors({ 'required': false });
          }
        }
      );
  }

  filter(value) {
    if (value === '' || value === undefined) {
      return this.users;
    } else {
      return this.users.filter(user =>
        user['Ime'].concat(' ', user['Prezime']).includes(value)
        || user['Ime'].concat(' ', user['Prezime']).toLowerCase().includes(value));
    }
  }
  get user() { return this.handoutCopyForm.get('user'); }
}

export interface DialogData {
  PrimerakID: number;
  ClanID: number;
}
