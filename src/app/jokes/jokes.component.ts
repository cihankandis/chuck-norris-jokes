import { Component, OnInit } from '@angular/core';

import { JokesService } from '../core/services/jokes.service';
import { Joke } from '../core/models/joke';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  private JOKE_COUNT = 10;
  jokes: Joke[] = [];
  fetchingJokes = false;

  constructor(
    private jokesService: JokesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchJokes();

    this.fetchCacheFromServer();
  }
  fetchCacheFromServer() {
    this.jokesService.getFavouritesFromServerCache().subscribe(favs => {});
  }

  fetchJokes() {
    this.fetchingJokes = true;
    this.jokesService.fetchJokes(this.JOKE_COUNT).subscribe(
      (jokes: any[]) => {
        this.jokes = jokes;
        this.fetchingJokes = false;
      },
      err => {
        this.fetchingJokes = false;
        this.toastr.error('Could not get the jokes!');
        console.error(err);
      }
    );
  }

  changeFavouriteStatusOfJoke(joke: Joke) {
    if (!joke.isFavourite && this.jokesService.isFavouriteListFull()) {
      this.toastr.error(
        'Favourite list is full. You should remove items to add new ones!'
      );
    } else {
      joke.isFavourite = this.jokesService.changeFavouriteStatusOfJoke(joke);
    }
  }
}
