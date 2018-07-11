import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from './restaurant.model';

import { restaurantAppeared } from '../../animations/app.animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [ restaurantAppeared ]
})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready';

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
