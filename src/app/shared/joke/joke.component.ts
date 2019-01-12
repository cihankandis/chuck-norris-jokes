import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Joke } from '../../core/models/joke';

@Component({
  selector: 'joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent {
  @Input() joke: Joke;
  @Output() favouriteChange = new EventEmitter();

  onFavouriteChange(joke) {
    this.favouriteChange.emit(joke);
  }
}
