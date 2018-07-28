import { Component, OnInit } from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable, from } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError, tap } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

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
  isLoading = false;
  isEmpty = false;
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
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(
          searchTerm => this.restaurantsService.restaurants(searchTerm)
            .pipe(catchError(error => from([])))
        )
      )
      .subscribe(rest => {
        this.isEmpty = rest.length === 0;
        this.restaurants = rest;
      });

    this.isLoading = true;
    this.restaurantsService.restaurants()
      .subscribe(rest => {
        this.restaurants = rest;
        this.isLoading = false;
      });
  }

  toggleSearchBar() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
