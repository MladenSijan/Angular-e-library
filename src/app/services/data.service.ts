import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { NotFoundError } from '../shared/errors/not-found-error';
import { AppError } from '../shared/errors/app-error';
import { BadInput } from '../shared/errors/bad-input';

@Injectable()
export class DataService {

  constructor(protected url: string, protected http: Http, private router: Router) { }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.handleError);
  }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  get(id) {
    return this.http.get(this.url + '/' + id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .map(response => response.json())
      .catch(this.handleError);
  }

  protected handleError(error: Response) {
    switch (error.status) {
      case 404:
        return Observable.throw(new NotFoundError(error.json()));
      case 400:
        return Observable.throw(new BadInput(error.json()));
      default:
        break;
    }
    return Observable.throw(new AppError(error.json()));
  }
}
