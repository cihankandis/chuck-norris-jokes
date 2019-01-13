import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
    this.user = storageService.getItem('user');
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
            this.storageService.setItem('user', user);
          }
          this.user = user;

          return user;
        })
      );
  }

  validateToken() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.user.token
    });

    return this.http.get<any>(`${environment.backendApiUrl}/login/verify`, {
      headers: headers
    });
  }

  isLoggedIn() {
    return !!this.user;
  }

  logout() {
    // remove user from local storage to log user out
    this.storageService.removeItem('user');
    this.user = null;
    this.router.navigate(['login']);
  }
}
