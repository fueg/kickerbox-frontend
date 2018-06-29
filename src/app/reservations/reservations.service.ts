import {Injectable} from '@angular/core';
import {Reservation} from '../data-model';
import {Observable, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  url = '/api/v1/reservation';

  constructor(private http: HttpClient) {
  }

  getReservations(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http
      .post<Reservation>(this.url, reservation, httpOptions)
      .pipe(catchError(this.handleError));
  }

  findReservationById(reservationList: Reservation[], reservationId: number) {
    return reservationList.find((reservation) => reservation.id === reservationId);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
