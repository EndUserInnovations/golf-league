import { Routes } from '@angular/router';
import { DbTestComponent } from './pages/db-test/db-test';
import { HomeComponent } from './home/home';
import { Players } from './players/players';
import { Scores } from './scores/scores';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: Players },
  { path: 'scores', component: Scores },


];
