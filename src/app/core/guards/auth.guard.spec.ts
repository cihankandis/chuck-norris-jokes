import { AuthGuardService } from './auth-guard.service';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

class MockRouter {
  navigate(path) {}
}

let mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuardService;
    let authService;
    let router;
    let toastrService: ToastrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ToastrModule.forRoot()],
        providers: [
          { provide: RouterStateSnapshot, useValue: mockSnapshot },
          ToastrService
        ]
      });

      // inject the service
      toastrService = TestBed.get(ToastrService);
    });

    it('should return true for a logged in user', () => {
      authService = { isLoggedIn: () => true, validateToken: () => of(true) };
      router = new MockRouter();

      toastrService = TestBed.get(ToastrService);
      authGuard = new AuthGuardService(authService, router, toastrService);

      authGuard
        .canActivate(new ActivatedRouteSnapshot(), mockSnapshot)
        .subscribe(res => {
          expect(res).toBe(true);
        });
    });

    it('should navigate to home for a logged out user', () => {
      authService = { isLoggedIn: () => false };
      router = new MockRouter();
      toastrService = TestBed.get(ToastrService);
      authGuard = new AuthGuardService(authService, router, toastrService);
      spyOn(router, 'navigate');

      expect(
        authGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)
      ).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: { returnUrl: undefined }
      });
    });
  });
});
