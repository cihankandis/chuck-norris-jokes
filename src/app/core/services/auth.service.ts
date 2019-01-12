import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: any;

  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getUser() {
    return this.user;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.backendApiUrl}/login`, {
        username,
        password
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.user = user;

          return user;
        })
      );
  }

  isLoggedIn() {
    return !!this.user;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['login']);
  }
}
