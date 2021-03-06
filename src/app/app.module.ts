import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ResultsComponent} from './results/results.component';
import {ReservationNewComponent} from './reservations/reservation-new/reservation-new.component';
import {ResultNewComponent} from './results/result-new/result-new.component';
import {TeamsComponent} from './teams/teams.component';
import {TeamNewComponent} from './teams/team-new/team-new.component';
import {KickerboxesComponent} from './kickerboxes/kickerboxes.component';
import {KickerboxNewComponent} from './kickerboxes/kickerbox-new/kickerbox-new.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  {path: 'reservations', component: ReservationsComponent},
  {path: 'reservations/new', component: ReservationNewComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'results/new', component: ResultNewComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/new', component: TeamNewComponent},
  {path: 'kickerboxes', component: KickerboxesComponent},
  {path: 'kickerboxes/new', component: KickerboxNewComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ReservationsComponent,
    ResultsComponent,
    ReservationNewComponent,
    ResultNewComponent,
    TeamsComponent,
    TeamNewComponent,
    KickerboxesComponent,
    KickerboxNewComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // debugging
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
