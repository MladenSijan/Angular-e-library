import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ErrorPageComponent } from '../error-page/error-page.component';

const coreRoutes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'users', loadChildren: '../users/users.module#UsersModule' },
  { path: 'books', loadChildren: '../books/books.module#BooksModule' },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(coreRoutes),
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }