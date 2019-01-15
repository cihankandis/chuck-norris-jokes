import { FavouritesComponent } from './favourites.component';
import { JokesService } from '../core/services/jokes.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { Joke } from '../core/models/joke';
import { Observable, of } from 'rxjs';
import { JOKES } from '../mock/mock-jokes';

class MockJokesService {
  private favouriteJokes: Joke[] = JOKES;

  getFavouriteJokes() {
    return this.favouriteJokes;
  }

  isFavouriteListFull() {
    return this.favouriteJokes.length >= 10;
  }
}

describe('Component: Favourites', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;
  let service: JokesService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), SharedModule],
      declarations: [FavouritesComponent],
      providers: [
        { provide: JokesService, useClass: MockJokesService, ToastrService }
      ]
    });

    // inject the service
    service = TestBed.get(JokesService);
    toastrService = TestBed.get(ToastrService);

    // create component and test fixture
    fixture = TestBed.createComponent(FavouritesComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('there should be 10 joke elements', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
    const jokeEls = fixture.debugElement.nativeElement.querySelectorAll(
      'app-joke'
    );
    expect(jokeEls.length).toBe(10);
  });
});
