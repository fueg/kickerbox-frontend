import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs/index';
import {Result} from '../data-model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  url = '/api/result';

  constructor(private http: HttpClient) {
  }

  // fake server get
  getResults(): Observable<Result[]> {
    return this.http
      .get<Result[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  createResult(result: Result): Observable<Result> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.http
      .post<Result>(this.url, result, httpOptions)
      .pipe(catchError(this.handleError));
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
