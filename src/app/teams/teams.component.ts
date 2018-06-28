import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Team} from '../data-model';
import {TeamsService} from './teams.service';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Observable<Team[]>;
  isLoading = false;

  constructor(private teamService: TeamsService) {
  }

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.isLoading = true;
    this.teams = this.teamService
      .getTeams()
      .pipe(finalize(() => this.isLoading = false));
  }
}
