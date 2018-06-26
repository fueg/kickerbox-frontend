import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {Reservation} from "../data-model";
import {ReservationsService} from "./reservations.service";
import {finalize} from "rxjs/internal/operators";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Observable<Reservation[]>;
  isLoading: false;

  constructor(private reservationsService: ReservationsService) {
  }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.isLoading = true;
    this.reservations = this.reservationsService
      .getReservations()
      .pipe(finalize( () => this.isLoading = false));
  }

}
