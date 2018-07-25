import { Injectable } from '@angular/core';

import { MenuItem } from './../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';
import { NotificationService } from '../../shared/messages/notification.service';

@Injectable()
export class ShoppingCartService {
  items: CartItem[] = [];

  constructor(private notificationService: NotificationService) {}

  clear() {
    this.items = [];
  }

  addItem(item: MenuItem) {
    let itemFound = this.items.find((cartItem) => item.id === cartItem.menuItem.id);
    if (itemFound) {
      this.increaseQty(itemFound);
    } else {
      this.items.push(new CartItem(item));
    }
    this.notificationService.notify(`Você adicionou o item ${item.name}.`);
  }

  increaseQty(item: CartItem) {
    item.quantity++;
  }

  decreaseQty(item: CartItem) {
    item.quantity--;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
    this.notificationService.notify(`Você removeu o item ${item.menuItem.name}.`);
  }

  get total(): number {
    return this.items.map(item => item.value)
      .reduce((acc, val) => acc + val, 0);
  }
}
