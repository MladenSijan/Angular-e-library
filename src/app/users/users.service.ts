import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';

@Injectable()
export class UsersService extends DataService {

  constructor(http: HttpClient, router: Router) {
    super('http://localhost:50760/api/Clanovi', http, router);
   }

}
