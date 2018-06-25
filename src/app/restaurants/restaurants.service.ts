import { Restaurant } from './restaurant/restaurant.model';

export class RestaurantsService {

  rests: Restaurant[] = [
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

  constructor() {}

  restaurants(): Restaurant[] {
    return this.rests;
  }
}
