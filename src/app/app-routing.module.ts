import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './core/guards/auth-guard.service';

import { LoginComponent } from './login/login.component';
import { JokesComponent } from './jokes/jokes.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/jokes',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'jokes',
    component: JokesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'jokes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
