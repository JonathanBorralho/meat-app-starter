import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { User } from './user.model';
import { MEAT_API } from '../../app.api';

@Injectable()
export class LoginService {

  loggedUser: User;
  lastUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }

  isLoggedIn(): boolean {
    return this.loggedUser !== undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${MEAT_API}/login`, {email, password})
      .pipe(
        tap(user => this.loggedUser = user)
      );
  }

  logout() {
    this.loggedUser = undefined;
  }
}
