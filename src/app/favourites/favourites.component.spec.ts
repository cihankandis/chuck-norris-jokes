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
    let jokeEls = fixture.debugElement.nativeElement.querySelectorAll('joke');
    expect(jokeEls.length).toBe(10);
  });
});

const JOKES: any[] = [
  {
    id: 375,
    joke:
      'After taking a steroids test doctors informed Chuck Norris that he had tested positive. He laughed upon receiving this information, and said &quot;of course my urine tested positive, what do you think they make steroids from?&quot;',
    categories: []
  },
  {
    id: 225,
    joke: 'Chuck Norris is the reason why Waldo is hiding.',
    categories: []
  },
  {
    id: 87,
    joke:
      'Contrary to popular belief, there is indeed enough Chuck Norris to go around.',
    categories: []
  },
  {
    id: 89,
    joke:
      'For some, the left testicle is larger than the right one. For Chuck Norris, each testicle is larger than the other one.',
    categories: ['explicit']
  },
  {
    id: 419,
    joke:
      "Count from one to ten. That's how long it would take Chuck Norris to kill you...Forty seven times.",
    categories: []
  },
  {
    id: 153,
    joke:
      'The movie &quot;Delta Force&quot; was extremely hard to make because Chuck had to downplay his abilities. The first few cuts were completely unbelievable.',
    categories: []
  },
  {
    id: 538,
    joke: "Chuck Norris's log statements are always at the FATAL level.",
    categories: ['nerdy']
  },
  {
    id: 163,
    joke:
      'Ninjas want to grow up to be just like Chuck Norris. But usually they grow up just to be killed by Chuck Norris.',
    categories: []
  },
  {
    id: 73,
    joke:
      "Chuck Norris doesn't actually write books, the words assemble themselves out of fear.",
    categories: []
  },
  {
    id: 15,
    joke:
      'When Chuck Norris goes to donate blood, he declines the syringe, and instead requests a hand gun and a bucket.',
    categories: []
  }
];

class MockJokesService {
  private favouriteJokes: any[] = JOKES;

  getFavouriteJokes() {
    return this.favouriteJokes;
  }

  isFavouriteListFull() {
    return this.favouriteJokes.length >= 10;
  }
}
