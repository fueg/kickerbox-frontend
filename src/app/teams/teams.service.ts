import { Injectable } from '@angular/core';
import {Team, teams} from '../data-model';
import {Observable, of} from 'rxjs/index';
import {delay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  delaysMs: 500;

  getTeams(): Observable<Team[]> {
    return of(teams).pipe(delay(this.delaysMs));
  }
}
