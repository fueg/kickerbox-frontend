import {Component, OnInit} from '@angular/core';
import {ReservationsService} from '../reservations.service';
import {TeamsService} from '../../teams/teams.service';
import {forkJoin, Observable} from 'rxjs/index';
import {Kickerbox, Reservation, Team} from '../../data-model';
import {finalize} from 'rxjs/internal/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {KickerboxService} from '../../kickerboxes/kickerbox.service';

@Component({
  selector: 'app-reservation-new',
  templateUrl: './reservation-new.component.html',
  styleUrls: ['./reservation-new.component.scss']
})
export class ReservationNewComponent implements OnInit {

  reservationForm: FormGroup;

  isLoading = false;
  teams: Team[];
  kickerboxes: Kickerbox[];

  constructor(private reservationService: ReservationsService,
              private teamsService: TeamsService,
              private kickerboxService: KickerboxService,
              private fb: FormBuilder,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.getData();
  }

  createForm() {
    this.reservationForm = this.fb.group({
      date: '',
      homeTeamId: '',
      visitorTeamId: '',
      kickerboxId: '',
    });
  }

  onSubmit() {
    const {date, homeTeamId, visitorTeamId, kickerboxId} = this.reservationForm.value;
    const savable = new Reservation(new Date(date), Number(homeTeamId), Number(visitorTeamId), Number(kickerboxId));

    console.log(savable);
    this.reservationService
      .createReservation(savable)
      .toPromise()
      .then(() => {
        this.cancel();
      });
  }

  cancel() {
    this.rebuildForm();
    this.router.navigate(['/reservations']);
  }

  rebuildForm() {
    this.reservationForm.reset({});
  }

  getData() {
    this.isLoading = true;
    forkJoin([
      this.teamsService.getTeams(),
      this.kickerboxService.getKickerboxes()
    ])
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((data) => {
        const [teams, kickerboxes] = data;
        this.teams = teams;
        this.kickerboxes = kickerboxes;
      });
  }

}
