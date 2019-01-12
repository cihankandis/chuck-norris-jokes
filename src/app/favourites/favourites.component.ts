import { Component, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';

import { JokesService } from '../core/services/jokes.service';
import { Joke } from '../core/models/joke';

const autoAddJokeInterval = interval(1000);

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  autoAddSubscription: Subscription;
  autoAddToggleValue: boolean = false;

  constructor(public jokesService: JokesService) {}

  changeFavouriteStatusOfJoke(joke: Joke) {
    joke.isFavourite = this.jokesService.changeFavouriteStatusOfJoke(joke);
  }

  onAutoAddChange(val) {
    this.autoAddToggleValue = val.checked;
    if (!val.checked) {
      if (this.autoAddSubscription) {
        this.autoAddSubscription.unsubscribe();
      }
    } else {
      this.autoAddSubscription = autoAddJokeInterval.subscribe(() => {
        this.jokesService.fetchJokes(1).subscribe(jokes => {
          if (!jokes[0].isFavourite) this.changeFavouriteStatusOfJoke(jokes[0]);
          if (this.jokesService.isFavouriteListFull()) {
            this.autoAddToggleValue = false;
            this.autoAddSubscription.unsubscribe();
          }
        });
      });
    }
  }
}
