import { Component, OnInit } from '@angular/core';

import { JokesService } from '../core/services/jokes.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  constructor(private jokesService: JokesService) {}
}
