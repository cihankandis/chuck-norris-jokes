import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { LoginComponent } from '../../login/login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { JokesComponent } from '../../jokes/jokes.component';
import { FavouritesComponent } from '../../favourites/favourites.component';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [LoginComponent, JokesComponent, FavouritesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    // inject the service
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should login', () => {
    service.login('username', 'password').subscribe(data => {
      expect(data.token).toBe('test_token');
    });

    const req = httpMock.expectOne('http://localhost:3000/login', 'login');
    expect(req.request.method).toBe('POST');

    req.flush({ token: 'test_token' });
  });

  it('should return true isloggedin', () => {
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should return false isloggedin', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });
});
