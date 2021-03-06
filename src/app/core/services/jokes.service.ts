import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Joke } from '../models/joke';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { JokesResponse } from '../models/jokesResponse';

const MAX_FAVOURITE_JOKE_COUNT = 10;

@Injectable({ providedIn: 'root' })
export class JokesService {
  private favouriteJokes: Joke[] =
    this.storageService.getItem('favouriteJokes') || [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  fetchJokes(count) {
    return this.http
      .get<JokesResponse>(
        `${environment.backendApiUrl}/api/v1/jokes/jokes/` + count
      )
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
        }),
        share()
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
      this.saveFavouritesOnServer().subscribe(success => {
        console.log('jokes saved on server');
      });
    }
  }

  getFavouritesFromServerCache() {
    return this.http.post<any>(
      `${environment.backendApiUrl}/cache/favourites`,
      {
        email: this.authService.getUser().user.email
      }
    );
  }

  private saveFavouritesOnServer() {
    return this.http.post<any>(`${environment.backendApiUrl}/cache`, {
      email: this.authService.getUser().user.email,
      favourites: this.favouriteJokes
    });
  }

  private removeFromFavourites(joke: Joke) {
    const index = this.favouriteJokes.findIndex(item => item.id === joke.id);
    if (index > -1) {
      this.favouriteJokes.splice(index, 1);
      this.storageService.setItem('favouriteJokes', this.favouriteJokes);
    }
  }
}
