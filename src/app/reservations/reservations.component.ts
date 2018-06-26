import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {Reservation} from "../data-model";
import {ReservationsService} from "./reservations.service";
import {finalize} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Observable<Reservation[]>;
  isLoading: false;

  constructor(
    private reservationsService: ReservationsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.isLoading = true;
    this.reservations = this.reservationsService
      .getReservations()
      .pipe(finalize( () => this.isLoading = false));
  }

  gotoMakeReservation() {
    this.router.navigate(['/reservations/new']);
  }
}
