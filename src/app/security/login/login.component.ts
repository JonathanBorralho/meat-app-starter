import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }

  login() {
    this.loginService.login(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe((user: User) => console.log(user));
  }
}
