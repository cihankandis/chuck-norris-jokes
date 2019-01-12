import { Component, OnInit } from '@angular/core';

import { JokesService } from '../core/services/jokes.service';
import { Joke } from '../core/models/joke';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  private JOKE_COUNT = 10;
  jokes: Joke[];

  constructor(private jokesService: JokesService) {}

  ngOnInit() {
    this.jokesService.fetchJokes(this.JOKE_COUNT).subscribe(
      (jokes: any[]) => {
        this.jokes = jokes;
        console.log(jokes);
      },
      err => {
        console.error(err);
      }
    );
  }

  changeFavouriteStatusOfJoke(joke: Joke) {
    joke.isFavourite = this.jokesService.changeFavouriteStatusOfJoke(joke);
  }
}
