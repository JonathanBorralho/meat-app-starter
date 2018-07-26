import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad {

  constructor(private loginService: LoginService, private router: Router) {}

  canLoad(route: Route): boolean {
    const isLoggedIn = this.loginService.isLoggedIn();
    if (!isLoggedIn) {
      this.loginService.handleLogin(`${route.path}`);
    }
    return isLoggedIn;
  }
}
