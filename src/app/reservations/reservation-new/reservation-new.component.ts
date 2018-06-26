import {Component, OnInit} from '@angular/core';
import {ReservationsService} from '../reservations.service';
import {TeamsService} from '../../teams/teams.service';
import {Observable} from 'rxjs/index';
import {Reservation, Team} from '../../data-model';
import {finalize} from 'rxjs/internal/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-new',
  templateUrl: './reservation-new.component.html',
  styleUrls: ['./reservation-new.component.scss']
})
export class ReservationNewComponent implements OnInit {

  reservationForm: FormGroup;

  isLoading = false;
  teams: Observable<Team[]>;

  constructor(private reservationService: ReservationsService,
              private teamsService: TeamsService,
              private fb: FormBuilder,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.getTeams();
  }

  createForm() {
    this.reservationForm = this.fb.group({
      date: '',
      homeTeamId: '',
      visitorTeamId: '',
    });
  }

  onSubmit() {
    const {date, homeTeamId, visitorTeamId} = this.reservationForm.value;
    const savable = new Reservation(new Date(date), homeTeamId, visitorTeamId, 1);

    this.reservationService
      .createReservation(savable)
      .toPromise()
      .then( () => { this.cancel(); });
  }

  cancel() {
    this.rebuildForm();
    this.router.navigate(['/reservations']);
  }

  rebuildForm() {
    this.reservationForm.reset({});
  }

  getTeams() {
    this.isLoading = true;
    this.teams = this.teamsService
      .getTeams()
      .pipe(finalize(() => this.isLoading = false));
  }

}
