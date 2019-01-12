import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // reset login status
    this.authService.logout();

    this.initializeForm();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  initializeForm() {
    this.loginForm = this.fb.group({
      usernameCtrl: new FormControl('', [Validators.required]),
      passwordCtrl: new FormControl('', [
        Validators.required,
        Validators.maxLength(32)
      ])
    });
  }

  getErrorUsername() {
    return this.loginForm.get('usernameCtrl').hasError('required')
      ? 'Username is required'
      : '';
  }

  getErrorPassword() {
    return this.loginForm.get('passwordCtrl').hasError('required')
      ? 'Username is required'
      : this.loginForm.get('passwordCtrl').hasError('maxlength')
      ? 'Passwords cannot be longer than 32 characters.'
      : '';
  }

  login() {
    this.authService
      .login(
        this.loginForm.get('usernameCtrl').value,
        this.loginForm.get('passwordCtrl').value
      )
      .subscribe(
        data => {
          console.log(data);
          // login successful so redirect to return url
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          console.log(error);
        }
      );
  }
}
