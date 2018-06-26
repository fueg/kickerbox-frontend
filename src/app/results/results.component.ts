import {Component, OnInit} from '@angular/core';
import {ResultsService} from './results.service';
import {Observable} from 'rxjs/index';
import {Result} from '../data-model';
import {finalize} from 'rxjs/internal/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: Observable<Result[]>;
  isLoading: false;

  constructor(private resultsService: ResultsService) {
  }

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.isLoading = true;
    this.results = this.resultsService
      .getResults()
      .pipe(finalize(() => this.isLoading = false));
  }
}
