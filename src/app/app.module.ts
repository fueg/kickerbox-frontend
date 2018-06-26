import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ResultsComponent} from './results/results.component';
import {ReservationNewComponent} from './reservations/reservation-new/reservation-new.component';

const appRoutes: Routes = [
  {path: 'reservations', component: ReservationsComponent},
  {path: 'reservations/new', component: ReservationNewComponent},
  {path: 'results', component: ResultsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ReservationsComponent,
    ResultsComponent,
    ReservationNewComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // debugging
    ),
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
