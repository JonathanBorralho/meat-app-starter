import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { User } from './user.model';
import { MEAT_API } from '../../app.api';

@Injectable()
export class LoginService {

  private loggedUser: User;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedUser !== undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${MEAT_API}/login`, {email, password})
      .do(user => this.loggedUser = user);
  }
}
