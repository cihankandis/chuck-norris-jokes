import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JokesService {
  constructor(private http: HttpClient, private router: Router) {}

  getJokes(count) {
    return this.http
      .get<any>(`${environment.jokesApiUrl}/jokes/random/${count}`)
      .pipe(
        map(jokes => {
          return jokes.value;
        })
      );
  }
}
