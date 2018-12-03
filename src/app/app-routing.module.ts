import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerLobbyComponent } from './server-lobby/server-lobby.component';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';
import { LeaderboardPageComponent} from 'src/app/leaderboard-page/leaderboard-page.component';

//ROUTES: EXAMPLE
/*
const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'manager', component: ManagerComponent}
];
*/

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'leaderboard-page', component: LeaderboardPageComponent},
  { path: 'server-lobby', component: ServerLobbyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
