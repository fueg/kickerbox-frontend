import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs/index';
import {Kickerbox, kickerboxes} from '../data-model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class KickerboxService {

  url = '/api/kickerbox';

  constructor(private http: HttpClient) {
  }

  getKickerboxes(): Observable<Kickerbox[]> {
    return this.http
      .get<Kickerbox[]>(this.url)
      .pipe(tap(
        data => console.log(data),
        error => console.log(error))
      )
      .pipe(catchError(this.handleError));
  }

  findKickerboxById(kickerboxList: Kickerbox[], id: number) {
    return kickerboxList.find((kickerbox) => kickerbox.id === id);
  }

  createKickerbox(kickerbox: Kickerbox): Observable<null> {
    kickerboxes.push(kickerbox);
    return of();
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
