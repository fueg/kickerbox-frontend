import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {Result, results} from '../data-model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  // fake server get
  getResults(): Observable<Result[]> {
    return of(results);
  }

  createResult(result: Result): Observable<null> {
    results.push(result);
    return of();
  }
}
