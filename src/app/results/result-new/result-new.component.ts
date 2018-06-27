import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Kickerbox, Reservation, ReservationView, Result, Team} from '../../data-model';
import {ReservationsService} from '../../reservations/reservations.service';
import {TeamsService} from '../../teams/teams.service';
import {KickerboxService} from '../../kickerboxes/kickerbox.service';
import {Router} from '@angular/router';
import {ResultsService} from '../results.service';
import {forkJoin} from 'rxjs/index';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-result-new',
  templateUrl: './result-new.component.html',
  styleUrls: ['./result-new.component.scss']
})
export class ResultNewComponent implements OnInit {

  resultForm: FormGroup;

  isLoading = false;
  unscoredReservations: ReservationView[];

  constructor(private resultService: ResultsService,
              private reservationService: ReservationsService,
              private teamsService: TeamsService,
              private kickerboxService: KickerboxService,
              private fb: FormBuilder,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.getReservationData();
  }

  createForm() {
    this.resultForm = this.fb.group({
      homeTeamScore: '',
      visitorTeamScore: '',
      reservationId: '',
    });
  }

  onSubmit() {
    const {reservationId, homeTeamScore, visitorTeamScore} = this.resultForm.value;
    const savable = new Result(Number(homeTeamScore), Number(visitorTeamScore), Number(reservationId));

    console.log(savable);
    this.resultService
      .createResult(savable)
      .toPromise()
      .then(() => {
        this.cancel();
      });
  }

  cancel() {
    this.rebuildForm();
    this.router.navigate(['/results']);
  }

  rebuildForm() {
    this.resultForm.reset({});
  }

  getReservationData() {
    this.isLoading = true;
    forkJoin(
      this.reservationService.getReservations(),
      this.resultService.getResults(),
      this.teamsService.getTeams(),
      this.kickerboxService.getKickerboxes()
    )
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data) => {
        const [reservations, results, teams, kickerboxes] = data;
        this.unscoredReservations = this.enrichReservations(this.getUnscoredReservations(reservations, results), teams, kickerboxes);
      });
  }

  private getUnscoredReservations(reservations: Reservation[], results: Result[]): Reservation[] {
    const reservationIdsInResults: number[] = results.map((result) => result.reservationId);
    return reservations.filter((reservation) => reservationIdsInResults.indexOf(reservation.id) < 0);
  }

  private enrichReservations(reservations: Reservation[], teams: Team[], kickerboxes: Kickerbox[]): ReservationView[] {
    return reservations.map((reservation) => {
      const {id: reservationId} = reservation;
      const {homeTeamId, visitorTeamId, kickerboxId} = this.reservationService.findReservationById(reservations, reservationId);
      const {name: homeTeamName} = this.teamsService.findTeamById(teams, homeTeamId);
      const {name: visitorTeamName} = this.teamsService.findTeamById(teams, visitorTeamId);
      const {name: kickerboxName, location: kickerboxLocation} = this.kickerboxService.findKickerboxById(kickerboxes, kickerboxId);

      return Object.assign(reservation, {homeTeamName, visitorTeamName, kickerboxName, kickerboxLocation});
    });
  }
}
