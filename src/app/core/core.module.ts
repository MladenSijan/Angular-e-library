import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { AppErrorHandler } from '../shared/errors/app-error-handler';
import { ErrorPageComponent } from '../error-page/error-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CoreRoutingModule
  ],
  declarations: [
    HomeComponent,
    ErrorPageComponent
  ],
  exports: [
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ]
})
export class CoreModule { }
