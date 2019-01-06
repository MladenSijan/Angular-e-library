import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../animations/router.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  animations: [
    routerTransition
  ]
})
export class BooksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
