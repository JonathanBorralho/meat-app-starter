import { MenuItem } from './../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';

export class ShoppingCartService {
  items: CartItem[] = [];

  clear() {
      this.items = [];
  }

  addItem(item: MenuItem) {
      let itemFound = this.items.find((cartItem) => item.id === cartItem.menuItem.id);
      if (itemFound) {
          itemFound.quantity++;
      } else {
          this.items.push(new CartItem(item));
      }
  }

  removeItem(item: CartItem) {
      this.items.splice(this.items.indexOf(item), 1);
  }

  get total(): number {
      return this.items.map(item => item.value)
        .reduce((acc, val) => acc + val, 0);
  }
}
