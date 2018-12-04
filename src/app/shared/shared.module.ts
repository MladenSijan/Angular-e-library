import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { ConfirmDeleteDialogComponent } from './dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { HandoutCopyDialogComponent } from './dialogs/handout-copy-dialog/handout-copy-dialog.component';
import { UsersService } from '../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [ConfirmDeleteDialogComponent, HandoutCopyDialogComponent],
  entryComponents: [ConfirmDeleteDialogComponent, HandoutCopyDialogComponent],
  providers: [UsersService]
})
export class SharedModule { }
