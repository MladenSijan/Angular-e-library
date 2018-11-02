import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';

@Injectable()
export class BooksService extends DataService {

  constructor(http: Http, router: Router) {
    super('http://somerandomurl.com', http, router);
  }

}
