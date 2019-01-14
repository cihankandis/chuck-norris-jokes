import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { JokesService } from './jokes.service';
import { AuthService } from './auth.service';

class MockAuthService {
  public getUser(): any {
    return { user: { email: 'mock' } };
  }
}

describe('JokesService', () => {
  let service: JokesService;
  let authService;
  let httpMock: HttpTestingController;

  let jokes: any[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JokesService,
        { provide: AuthService, useClass: MockAuthService }
      ],
      imports: [HttpClientTestingModule]
    });

    // inject the service
    service = TestBed.get(JokesService);
    authService = TestBed.get(JokesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should return the data', () => {
    service.fetchJokes(10).subscribe(data => {
      expect(data.length).toBe(10);
      jokes = data;
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/api/v1/jokes/jokes/10',
      'fetch jokes'
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      value: [
        {
          id: 375,
          joke:
            'After taking a steroids test doctors informed Chuck Norris that he ',
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
            'Count from one to ten. Thats how long it would take Chuck Norris to kill you...Forty seven times.',
          categories: []
        },
        {
          id: 153,
          joke: 'The movie &quot;Delta Force&quot; was extremely unbelievable.',
          categories: []
        },
        {
          id: 538,
          joke: 'Chuck Norriss log statements are always at the FATAL level.',
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
            'Chuck Norris doesnt actually write books, the words assemble themselves out of fear.',
          categories: []
        },
        {
          id: 15,
          joke:
            'When Chuck Norris goes to donate blood, he declines the syringe, and instead requests a hand gun and a bucket.',
          categories: []
        }
      ]
    });
  });

  it('should return empty favourites list', () => {
    expect(service.getFavouriteJokes().length).toBe(0);
  });

  it('should return false isfavourite list full', () => {
    expect(service.isFavouriteListFull()).toBe(false);
  });

  it('should return true changeFavouriteStatusOfJoke', () => {
    expect(service.changeFavouriteStatusOfJoke(jokes[0])).toBe(true);
  });

  it('should return false changeFavouriteStatusOfJoke', () => {
    expect(service.changeFavouriteStatusOfJoke(jokes[0])).toBe(false);
  });

  it('should return true isfavourite list full', () => {
    jokes.map(joke => {
      service.changeFavouriteStatusOfJoke(joke);
    });
    expect(service.isFavouriteListFull()).toBe(true);
  });

  it('should return false isfavourite list full', () => {
    jokes.map(joke => {
      service.changeFavouriteStatusOfJoke(joke);
    });
    expect(service.isFavouriteListFull()).toBe(false);
  });
  it('should return false isfavourite list full', () => {
    expect(service.isFavouriteListFull()).toBe(false);
  });
});
