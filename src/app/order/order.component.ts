import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { RadioOption } from './../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { LoginService } from '../security/login/login.service';
import { User } from '../security/login/user.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  user: User;
  orderForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;
  delivery = 8;
  isSubmitLoading = false;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ];

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true};
    }

    return undefined;
  }

  constructor(private orderService: OrderService,
              private loginService: LoginService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.loginService.loggedUser;

    this.orderForm = new FormGroup({
      name: this.fb.control(this.user.name || '', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control(this.user.email || '', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.fb.control( this.user.email || '', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      number: this.fb.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.fb.control(''),
      paymentOption: this.fb.control('', Validators.required)
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'});
  }

  get orderItems(): CartItem[] {
    return this.orderService.cartItems;
  }

  get itemsValue(): number {
    return this.orderService.itemsValue;
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.orderItems.map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.isSubmitLoading = true;
    this.orderService.checkOrder(order).subscribe(_order => {
      this.isSubmitLoading = false;
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    });
  }

}
