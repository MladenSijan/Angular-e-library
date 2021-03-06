import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { NavigationComponent } from './navigation/navigation.component';

const coreRoutes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: NavigationComponent },
      { path: 'knjige', loadChildren: '../books/books.module#BooksModule' },
      { path: 'clanovi', loadChildren: '../users/users.module#UsersModule' }
    ]
  },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
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
