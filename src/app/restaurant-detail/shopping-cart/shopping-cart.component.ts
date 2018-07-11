import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '../../../../node_modules/@angular/animations';
import { MenuItem } from './../menu-item/menu-item.model';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      transition(':enter', [
        animate('300ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
          style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
          style({ opacity: 0, transform: 'translateX(0px)', offset: 1 })
        ]))
      ]),
      transition(':leave', [
        animate('300ms 0s ease-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0px)', offset: 0 }),
          style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
          style({ opacity: 0, transform: 'translateX(30px)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  clear() {
    this.shoppingCartService.clear();
  }

  addItem(item: MenuItem) {
    this.shoppingCartService.addItem(item);
  }

  removeItem(item: CartItem) {
    this.shoppingCartService.removeItem(item);
  }

  get items(): CartItem[] {
    return this.shoppingCartService.items;
  }

  get total(): number {
    return this.shoppingCartService.total;
  }

}
