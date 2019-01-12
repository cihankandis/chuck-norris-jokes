import { Component, OnInit } from '@angular/core';

import { JokesService } from '../core/services/jokes.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  private JOKE_COUNT = 10;
  jokes: any[];

  constructor(private jokesService: JokesService) {}

  ngOnInit() {
    this.jokesService.getJokes(this.JOKE_COUNT).subscribe(
      (jokes: any[]) => {
        this.jokes = jokes;
        console.log(jokes);
      },
      err => {
        console.error(err);
      }
    );
  }
}
