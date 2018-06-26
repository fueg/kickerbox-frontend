import { Injectable } from '@angular/core';
import {Team, teams} from '../data-model';
import {Observable, of} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  getTeams(): Observable<Team[]> {
    return of(teams);
  }
}
