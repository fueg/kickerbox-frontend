import {Component, OnInit} from '@angular/core';
import {ResultsService} from './results.service';
import {forkJoin} from 'rxjs/index';
import {Kickerbox, Reservation, Result, ResultView, Team} from '../data-model';
import {finalize} from 'rxjs/internal/operators';
import {TeamsService} from '../teams/teams.service';
import {KickerboxService} from '../kickerboxes/kickerbox.service';
import {ReservationsService} from '../reservations/reservations.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: ResultView[];
  isLoading = false;

  constructor(private resultsService: ResultsService,
              private teamsService: TeamsService,
              private kickerboxService: KickerboxService,
              private reservationService: ReservationsService) {
  }

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.isLoading = true;
    forkJoin(
      this.resultsService.getResults(),
      this.teamsService.getTeams(),
      this.kickerboxService.getKickerboxes(),
      this.reservationService.getReservations())
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data) => {
        const [results, teams, kickerboxes, reservations] = data;
        this.results = this.enrichResults(results, teams, kickerboxes, reservations);
      });
  }

  private enrichResults(results: Result[], teams: Team[], kickerboxes: Kickerbox[], reservations: Reservation[]): ResultView[] {
    return results
      .map((result) => {
        const {reservationId} = result;
        const {homeTeamId, visitorTeamId, kickerboxId} = this.getReservationById(reservations, reservationId);
        const {name: homeTeamName} = this.getTeamById(teams, homeTeamId);
        const {name: visitorTeamName} = this.getTeamById(teams, visitorTeamId);
        const {name: kickerboxName, location: kickerboxLocation} = this.getKickerboxById(kickerboxes, kickerboxId);

        return Object.assign(result, {homeTeamName, visitorTeamName, kickerboxName, kickerboxLocation});
      });
  }

  private getReservationById(reservations: Reservation[], reservationId: number) {
    return reservations.find((reservation) => reservation.id === reservationId);
  }

  private getTeamById(teams: Team[], teamId: number) {
    return teams.find((team) => team.id === teamId);
  }

  private getKickerboxById(kickerboxes: Kickerbox[], kickerboxId: number) {
    return kickerboxes.find((kickerbox) => kickerbox.id === kickerboxId);
  }
}
