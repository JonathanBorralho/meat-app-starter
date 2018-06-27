import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './../../restaurants/restaurants.service';
import { MenuItem } from './../menu-item/menu-item.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu$: Observable<MenuItem[]>;

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.parent.snapshot.params['id'];
    this.menu$ = this.restaurantsService.menuOfRestaurant(id);
  }

}
