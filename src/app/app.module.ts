import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ResultsComponent} from './results/results.component';

const appRoutes: Routes = [
  {path: 'reservations', component: ReservationsComponent},
  {path: 'results', component: ResultsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ReservationsComponent,
    ResultsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // debugging
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
