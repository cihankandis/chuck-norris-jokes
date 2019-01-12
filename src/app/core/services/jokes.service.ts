import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Joke } from '../models/joke';

@Injectable({ providedIn: 'root' })
export class JokesService {
  private MAX_FAVOURITE_JOKE_COUNT = 10;
  favouriteJokes: Joke[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getJokes(count) {
    return this.http
      .get<any>(`${environment.jokesApiUrl}/jokes/random/${count}`)
      .pipe(
        map(jokes => {
          return jokes.value;
        })
      );
  }

  changeFavouriteStatusOfJoke(joke: Joke) {
    if (this.favouriteJokes.findIndex(item => item.id === joke.id) >= 0) {
      this.removeFromFavourites(joke);
      return false;
    } else {
      if (this.favouriteJokes.length >= this.MAX_FAVOURITE_JOKE_COUNT) {
        return false;
      }
      this.addToFavourites(joke);
      return true;
    }
  }

  addToFavourites(joke: Joke) {
    if (this.favouriteJokes.findIndex(item => item.id === joke.id) < 0) {
      this.favouriteJokes.push(joke);
    }
  }

  removeFromFavourites(joke: Joke) {
    let index = this.favouriteJokes.findIndex(item => item.id === joke.id);
    if (index > -1) {
      this.favouriteJokes.splice(index, 1);
    }
  }
}
