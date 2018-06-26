import { Injectable } from '@angular/core';
import {Reservation, reservations} from '../data-model';
import {Observable, of, throwError} from 'rxjs/index';
import {delay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  delaysMs = 500;

  // fake server get
  getReservations(): Observable<Reservation[]> {
    return of(reservations).pipe(delay(this.delaysMs));
  }

  createReservation(reservation: Reservation): Observable<> {
    reservations.push(reservation);
    return of();
  }
}
