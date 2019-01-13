import { AuthGuardService } from './auth-guard.service';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

class MockRouter {
  navigate(path) {}
}

let mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

TestBed.configureTestingModule({
  imports: [RouterTestingModule],
  providers: [{ provide: RouterStateSnapshot, useValue: mockSnapshot }]
}).compileComponents();

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuardService;
    let authService;
    let router;

    it('should return true for a logged in user', () => {
      authService = { isLoggedIn: () => true };
      router = new MockRouter();
      authGuard = new AuthGuardService(authService, router);

      expect(
        authGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)
      ).toEqual(true);
    });

    it('should navigate to home for a logged out user', () => {
      authService = { isLoggedIn: () => false };
      router = new MockRouter();
      authGuard = new AuthGuardService(authService, router);
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
