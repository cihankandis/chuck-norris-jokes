import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { JokesService } from '../../core/services/jokes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public jokesService: JokesService
  ) {}
  logout() {
    this.authService.logout();
  }
}
