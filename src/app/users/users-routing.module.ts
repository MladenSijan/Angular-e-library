import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const userRoutes = [
  {
    path: '', component: UsersComponent, children: [
      { path: '', component: UserListComponent },
      { path: 'new', component: NewUserComponent },
      { path: ':id', component: UserDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: []
})
export class UsersRoutingModule { }
