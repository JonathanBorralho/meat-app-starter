import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';

import { InputContainerComponent } from './input-container/input-container.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { OrderService } from '../order/order.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { LoginService } from '../security/login/login.service';
import { LoggedInGuard } from '../security/loggedin.guard';
import { LeaveOrderGuard } from '../order/leave-order.guard';
import { AuthInterceptor } from '../security/auth.interceptor';
import { AutofocusDirective } from './autofocus/autofocus.directive';
import { LoadingComponent } from './loading/loading.component';
import { LoadingLinkDirective } from './loadingLink/loading-link.directive';

@NgModule({
  declarations: [
      InputContainerComponent,
      RadioComponent,
      RatingComponent,
      SnackbarComponent,
      AutofocusDirective,
      LoadingLinkDirective,
      LoadingComponent
    ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputContainerComponent,
    RadioComponent,
    RatingComponent,
    SnackbarComponent,
    AutofocusDirective,
    LoadingLinkDirective,
    LoadingComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ShoppingCartService,
        RestaurantsService,
        OrderService,
        NotificationService,
        LoginService,
        LoggedInGuard,
        LeaveOrderGuard,
        LoadingLinkDirective,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
      ]
    };
  }
}
