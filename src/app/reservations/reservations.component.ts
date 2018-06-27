import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs/index';
import {Kickerbox, Reservation, ReservationView, Team} from '../data-model';
import {ReservationsService} from './reservations.service';
import {finalize} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {TeamsService} from '../teams/teams.service';
import {KickerboxService} from '../kickerboxes/kickerbox.service';

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
              private kickerboxService: KickerboxService,
              private router: Router) {
  }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.isLoading = true;
    forkJoin([
      this.reservationsService.getReservations(),
      this.teamsService.getTeams(),
      this.kickerboxService.getKickerboxes()
    ])
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data) => {
        const [reservations, teams, kickerBoxes] = data;
        this.reservations = this.enrichReservations(reservations, teams, kickerBoxes);
      });
  }

  private enrichReservations(reservations: Reservation[], teams: Team[], kickerBoxes: Kickerbox[]): ReservationView[] {
    return reservations
      .map((reservation) => {

        const {homeTeamId, visitorTeamId} = reservation;
        const {name: homeTeamName} = this.getTeamById(teams, homeTeamId);
        const {name: visitorTeamName} = this.getTeamById(teams, visitorTeamId);

        return Object.assign(reservation, {homeTeamName, visitorTeamName});
      })
      .map((reservation) => {
        const {kickerboxId} = reservation;
        const {name: kickerBoxName, location: kickerBoxLocation} = this.getKickerboxById(kickerBoxes, kickerboxId);

        return Object.assign(reservation, {kickerBoxName, kickerBoxLocation});
      });
  }

  private getTeamById(teams: Team[], teamId: number) {
    return teams.find((team) => team.id === teamId);
  }

  private getKickerboxById(kickerboxes: Kickerbox[], kickerboxId: number): Kickerbox {
    return kickerboxes.find((kickerbox) => kickerbox.id === kickerboxId);
  }

  gotoMakeReservation() {
    this.router.navigate(['/reservations/new']);
  }
}
