import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { JokesComponent } from '../jokes/jokes.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { HttpClientModule } from '@angular/common/http';

describe('Component: Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule
      ],
      declarations: [LoginComponent, JokesComponent, FavouritesComponent],
      providers: [AuthService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username validation', () => {
    let errors = {};
    const username = component.loginForm.controls['usernameCtrl'];
    expect(username.valid).toBeFalsy();

    // username field is required
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set username to something
    username.setValue('test');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();

    // Set username to something correct
    username.setValue('test@example.com');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    const password = component.loginForm.controls['passwordCtrl'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['maxlength']).toBeFalsy();

    // Set email to something
    password.setValue('123456');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();

    // Set email to something correct
    password.setValue('1234567890123456789012345678901234567890');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();
  });
});
