import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription } from 'rxjs';

import { JokesService } from '../core/services/jokes.service';
import { Joke } from '../core/models/joke';
import { ToastrService } from 'ngx-toastr';

const autoAddJokeInterval = interval(5000);

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnDestroy {
  autoAddSubscription: Subscription;
  autoAddToggleValue = false;

  constructor(
    public jokesService: JokesService,
    private toastr: ToastrService
  ) {}

  changeFavouriteStatusOfJoke(joke: Joke) {
    joke.isFavourite = this.jokesService.changeFavouriteStatusOfJoke(joke);
  }

  onAutoAddChange(val) {
    this.autoAddToggleValue = val.checked;
    if (!val.checked) {
      this.deactivateAutoJoke();
    } else {
      this.activateAutoJoke();
    }
  }

  private deactivateAutoJoke() {
    this.autoAddToggleValue = false;
    if (this.autoAddSubscription) {
      this.autoAddSubscription.unsubscribe();
    }
  }

  private activateAutoJoke() {
    this.autoAddSubscription = autoAddJokeInterval.subscribe(() => {
      this.jokesService.fetchJokes(1).subscribe(jokes => {
        if (jokes && !jokes[0].isFavourite) {
          this.changeFavouriteStatusOfJoke(jokes[0]);
        }
        this.checkFavouriteListFull();
      });
    });
  }
  private checkFavouriteListFull() {
    if (this.jokesService.isFavouriteListFull()) {
      if (this.autoAddToggleValue) {
        this.toastr.info('Favourite list is full!');
      }
      this.deactivateAutoJoke();
    }
  }

  ngOnDestroy() {
    if (this.autoAddSubscription) {
      this.autoAddSubscription.unsubscribe();
    }
  }
}
