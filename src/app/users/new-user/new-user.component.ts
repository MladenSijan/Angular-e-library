import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { AppError } from '../../shared/errors/app-error';
import { MatSnackBar } from '@angular/material';
import { BadInput } from '../../shared/errors/bad-input';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;
  constructor(private userService: UsersService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.snackBar.open('Brisanje knjige neuspešno. Nisu vraćeni svi primerci knjige', null, {
      duration: 250000,
    });
    this.userForm = new FormGroup({
      'JMBG': new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(13),
          Validators.pattern(/^\d+$/i)
        ]),
      'Ime': new FormControl(null, Validators.required),
      'Prezime': new FormControl(null, Validators.required),
      'BrojTelefona': new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/i)]),
      'EmailAdresa': new FormControl(null, [Validators.required, Validators.email]),
      'PostanskaAdresa': new FormControl(null, Validators.required)
    });
  }

  get jmbg() { return this.userForm.get('JMBG'); }
  get BrojTelefona() { return this.userForm.get('BrojTelefona'); }
  get EmailAdresa() { return this.userForm.get('EmailAdresa'); }

  onSubmit() {
    this.userService.create(this.userForm.value)
      .subscribe(
        newUser => {
          console.log(newUser);
          this.userForm.reset();
          for (const name in this.userForm.controls) {
            if (this.userForm.controls.hasOwnProperty(name)) {
              this.userForm.controls[name].setErrors(null);
            }
          }
          this.snackBar.open('Član je uspešno dodat', null, {
            duration: 2000,
          });
        },
        (error: AppError) => {
          if (error instanceof BadInput) {
            this.snackBar.open('Član sa zadatim JMBG brojem već postoji', null, {
              duration: 2000,
            });
          } else {
            this.snackBar.open('Došlo je do greške', null, {
              duration: 2000,
            });
          }
        }
      );
  }
}
