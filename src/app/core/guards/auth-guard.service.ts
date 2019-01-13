import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | any> | boolean {
    if (!this.authService.isLoggedIn()) {
      // not logged in, redirect to login page with return url.
      this.navigateLogin(state);
    } else {
      return this.authService.validateToken().pipe(
        map(success => true),
        catchError((err, caught) => {
          this.toastrService.error(err.error.err);
          this.navigateLogin(state);
          return empty();
        })
      );
    }
  }

  navigateLogin(state) {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}
