import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from './../../restaurants/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews$: Observable<any>;
  imageUrl = 'assets/img/reactions';

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.parent.snapshot.params['id'];
    this.reviews$ = this.restaurantsService.reviewsOfRestaurant(id);
  }

  reviewUrlImage(rating: number): string {
    let imgName: string;

    if (rating < 3) {
      imgName = 'pissed';
    } else if (rating >= 3 && rating < 4) {
      imgName = 'soso';
    } else if (rating >= 4) {
      imgName = 'loved';
    }

    return `${this.imageUrl}/${imgName}.png`;
  }

}
