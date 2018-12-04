import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';

@Injectable()
export class BooksService extends DataService {

  constructor(http: HttpClient, router: Router) {
    super('http://localhost:50760/api/knjige', http, router);
  }

  handOutCopy(resource) {
    return this.http.post(this.url + '/izdajPrimerak', resource, this.httpOptions)
      .catch(this.handleError);
  }

  returnCopy(id) {
    return this.http.post(this.url + '/vratiPrimerak?primerak=' + id, {})
      .catch(this.handleError);
  }

  createCopy(resource) {
    return this.http.post(this.url + '/noviPrimerak', resource)
      .catch(this.handleError);
  }

  deleteCopy(id) {
    return this.http.delete(this.url + '/obrisiPrimerak/' + id)
      .catch(this.handleError);
  }

}
