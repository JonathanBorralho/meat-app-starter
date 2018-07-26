import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationService } from '../../shared/messages/notification.service';
import { LoginService } from './login.service';
import { User } from './user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');

    this.formLogin = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }

  login() {
    this.loginService.login(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe(
        (user: User) => this.notificationService.notify(`Bem vindo(a), ${user.name}.`),
        (resp: HttpErrorResponse) => this.notificationService.notify(resp.error.message),
        () => this.router.navigate([ atob(this.navigateTo) ])
      );
  }
}
