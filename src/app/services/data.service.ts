import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppError } from '../shared/errors/app-error';
import { NotFoundError } from '../shared/errors/not-found-error';
import { BadInput } from '../shared/errors/bad-input';

@Injectable()
export class DataService {

  constructor(protected url: string, protected http: HttpClient, private router: Router) { }

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  create(resource) {
    return this.http.post(this.url, resource, this.httpOptions)
      .catch(this.handleError);
  }

  getAll() {
    return this.http.get(this.url)
      .catch(this.handleError);
  }

  get(id) {
    return this.http.get(this.url + '/' + id)
      .catch(this.handleError);
  }

  update(resource) {
    return this.http.put(this.url, resource, this.httpOptions)
      .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .catch(this.handleError);
  }

  protected handleError(error) {
    switch (error.status) {
      case 404:
        return Observable.throw(new NotFoundError(error));
      case 400:
        return Observable.throw(new BadInput(error));
      default:
        break;
    }
    return Observable.throw(new AppError(error));
  }
}
