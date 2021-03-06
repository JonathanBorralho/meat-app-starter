import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);

    if (loginService.isLoggedIn()) {
      const authHeader = {
        setHeaders: {
          'Authorization': `Bearer ${loginService.loggedUser.accessToken}`
        }
      };
      const authRequest = req.clone(authHeader);
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
