import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RestaurantsService } from './../../restaurants/restaurants.service';
import { MenuItem } from './../menu-item/menu-item.model';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: MenuItem[];
  isLoading = false;

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.parent.snapshot.params['id'];
    this.isLoading = true;
    this.restaurantsService.menuOfRestaurant(id)
      .subscribe(itens => {
        this.menu = itens;
        this.isLoading = false;
      });
  }

}
