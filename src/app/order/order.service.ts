import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';

@Injectable()
export class OrderService {
  constructor(private cartService: ShoppingCartService) {}

  get cartItems(): CartItem[] {
    return this.cartService.items;
  }

  get itemsValue(): number {
    return this.cartService.total;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
