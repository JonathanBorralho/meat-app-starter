import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [
    {
      id: 'coffee-corner',
      name: 'Coffee Corner',
      category: 'Coffee Shop',
      deliveryEstimate: '30-40m',
      rating: 4.8,
      imagePath: 'assets/img/restaurants/coffeecorner.png'
    },
    {
      id: 'green-food',
      name: 'Green Food',
      category: 'Saudável',
      deliveryEstimate: '75m',
      rating: 4.1,
      imagePath: 'assets/img/restaurants/greenfood.png'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
