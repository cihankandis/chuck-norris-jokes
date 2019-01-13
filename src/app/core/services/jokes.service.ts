import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Joke } from '../models/joke';
import { StorageService } from './storage.service';

const MAX_FAVOURITE_JOKE_COUNT = 10;

@Injectable({ providedIn: 'root' })
export class JokesService {
  private favouriteJokes: Joke[] =
    this.storageService.getItem('favouriteJokes') || [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  fetchJokes(count) {
    return this.http
      .get<any>(`${environment.backendApiUrl}/api/v1/jokes/jokes/` + count)
      .pipe(
        map(jokes => {
          //   return jokes.value;
          return (
            jokes &&
            jokes.value &&
            jokes.value.map(joke => {
              joke.isFavourite =
                this.favouriteJokes.findIndex(item => item.id === joke.id) >= 0;
              return joke;
            })
          );
        })
      );
  }

  getFavouriteJokes() {
    return this.favouriteJokes;
  }

  isFavouriteListFull() {
    return this.favouriteJokes.length >= MAX_FAVOURITE_JOKE_COUNT;
  }

  changeFavouriteStatusOfJoke(joke: Joke): boolean {
    if (this.favouriteJokes.findIndex(item => item.id === joke.id) >= 0) {
      this.removeFromFavourites(joke);
      return false;
    } else {
      if (this.favouriteJokes.length >= MAX_FAVOURITE_JOKE_COUNT) {
        return false;
      }
      this.addToFavourites(joke);
      return true;
    }
  }

  private addToFavourites(joke: Joke) {
    if (this.favouriteJokes.findIndex(item => item.id === joke.id) < 0) {
      joke.isFavourite = true;
      this.favouriteJokes.push(joke);
      this.storageService.setItem('favouriteJokes', this.favouriteJokes);
    }
  }

  private removeFromFavourites(joke: Joke) {
    let index = this.favouriteJokes.findIndex(item => item.id === joke.id);
    if (index > -1) {
      this.favouriteJokes.splice(index, 1);
      this.storageService.setItem('favouriteJokes', this.favouriteJokes);
    }
  }
}
