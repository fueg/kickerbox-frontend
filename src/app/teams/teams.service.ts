import {Injectable} from '@angular/core';
import {Team, teams} from '../data-model';
import {Observable, of, throwError} from 'rxjs/index';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url = '/api/v1/team';

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    return this.http
      .get<Team[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  findTeamById(teamList: Team[], id: number) {
    return teamList.find((team) => team.id === id);
  }

  createTeam(team: Team): Observable<null> {
    teams.push(team);
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
