import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!this.authService.isLoggedIn()) {
      // not logged in, redirect to login page with return url.
      return this.navigateLogin(state);
    } else {
      return this.authService.validateToken().pipe(
        map(success => true),
        catchError((err, caught) => {
          const errMsg = err.error.err || 'There is a problem on the server!';
          this.toastrService.error(errMsg);
          this.navigateLogin(state);
          return EMPTY;
        })
      );
    }
  }

  navigateLogin(state): boolean {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
