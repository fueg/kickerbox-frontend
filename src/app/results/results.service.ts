import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {Result, results} from '../data-model';
import {delay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  // fake server get
  getResults(): Observable<Result[]> {
    return of(results);
  }
}
