import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs/index';
import {Reservation, ReservationView, Team} from '../data-model';
import {ReservationsService} from './reservations.service';
import {finalize} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {TeamsService} from '../teams/teams.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: ReservationView[];
  isLoading = false;

  constructor(private reservationsService: ReservationsService,
              private teamsService: TeamsService,
              private router: Router) {
  }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.isLoading = true;
    forkJoin([this.reservationsService.getReservations(), this.teamsService.getTeams()])
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data) => {
        const [reservations, teams] = data;
        this.reservations = this.enrichReservations(reservations, teams);
      });
  }

  private enrichReservations(reservations: Reservation[], teams: Team[]): ReservationView[] {
    return reservations.map((reservation) => {

      const {homeTeamId, visitorTeamId} = reservation;
      const {name: homeTeamName} = this.getTeamById(teams, homeTeamId);
      const {name: visitorTeamName} = this.getTeamById(teams, visitorTeamId);

      return Object.assign(reservation, {homeTeamName, visitorTeamName});
    });
  }

  private getTeamById(teams: Team[], teamId: number) {
    return teams.find((team) => team.id === teamId);
  }

  gotoMakeReservation() {
    this.router.navigate(['/reservations/new']);
  }
}
