import { Component, OnInit } from '@angular/core';
import { state, trigger, style, transition, animate } from '../../../node_modules/@angular/animations';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { FormBuilder, FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  searchBarState = 'hidden';
  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
      .switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm))
      .subscribe(rest => this.restaurants = rest);

    this.restaurantsService.restaurants()
      .subscribe(rest => this.restaurants = rest);
  }

  toggleSearchBar() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
