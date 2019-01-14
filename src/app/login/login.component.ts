import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { ValidationService } from '../core/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  isLoginFailed = false;

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
        Validators.maxLength(32),
        ValidationService.passwordForbiddenCharactersValidator,
        ValidationService.passwordIncreasingThreeLettersValidator,
        ValidationService.passwordTwoNonOverlapingPairsValidator
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
      ? 'Password is required'
      : this.loginForm.get('passwordCtrl').hasError('maxlength')
      ? 'Passwords cannot be longer than 32 characters.'
      : this.loginForm.get('passwordCtrl').hasError('invalidIncreasingLetters')
      ? 'Passwords must include one increasing straight of at least three letters, like ‘abc’, ‘cde’, ‘fgh’, and so on, up to ‘xyz’.'
      : this.loginForm.get('passwordCtrl').hasError('invalidCharacters')
      ? 'Passwords may not contain the letters i, O, or l, as these letters'
      : this.loginForm.get('passwordCtrl').hasError('overlapingPairs')
      ? 'Passwords must contain at least two non-overlapping pairs of letters'
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
          // login successful so redirect to return url
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          this.isLoginFailed = true;
        }
      );
  }
}
