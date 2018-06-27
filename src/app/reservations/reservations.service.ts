import { Injectable } from '@angular/core';
import {Reservation, reservations} from '../data-model';
import {Observable, of, throwError} from 'rxjs/index';
import {delay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  // fake server get
  getReservations(): Observable<Reservation[]> {
    return of(reservations);
  }

  createReservation(reservation: Reservation): Observable<null> {
    reservations.push(reservation);
    return of();
  }

  findReservationById(reservationList: Reservation[], reservationId: number) {
    return reservationList.find((reservation) => reservation.id === reservationId);
  }
}
