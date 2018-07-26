import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  checkAuthentication(path: string): boolean {
    const isLoggedIn = this.loginService.isLoggedIn();
    if (!isLoggedIn) {
      this.loginService.handleLogin(path);
    }
    return isLoggedIn;
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication(route.routeConfig.path);
  }
}
