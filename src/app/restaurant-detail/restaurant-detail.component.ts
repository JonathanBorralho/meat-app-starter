import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant;
  isLoading = false;

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.isLoading = true;
    this.restaurantsService.restaurantById(id)
      .subscribe(rest => {
        this.restaurant = rest;
        this.isLoading = false;
      });
  }

}
