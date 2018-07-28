import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { listItemAppeared } from '../../animations/app.animations';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  animations: [ listItemAppeared ]
})
export class ReviewsComponent implements OnInit {

  reviews: any[];
  imageUrl = 'assets/img/reactions';
  isLoading = false;

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.parent.snapshot.params['id'];
    this.isLoading = true;
    this.restaurantsService.reviewsOfRestaurant(id)
      .subscribe(r => {
        this.reviews = r;
        this.isLoading = false;
      });
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
