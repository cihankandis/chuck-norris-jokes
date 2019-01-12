import { Component, OnInit } from '@angular/core';

import { JokesService } from '../core/services/jokes.service';
import { Joke } from '../core/models/joke';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  constructor(public jokesService: JokesService) {}

  changeFavouriteStatusOfJoke(joke: Joke) {
    joke.isFavourite = this.jokesService.changeFavouriteStatusOfJoke(joke);
  }
}
