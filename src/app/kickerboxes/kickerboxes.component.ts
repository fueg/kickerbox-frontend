import {Component, OnInit} from '@angular/core';
import {KickerboxService} from './kickerbox.service';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Kickerbox} from '../data-model';

@Component({
  selector: 'app-kickerboxes',
  templateUrl: './kickerboxes.component.html',
  styleUrls: ['./kickerboxes.component.scss']
})
export class KickerboxesComponent implements OnInit {

  kickerboxes: Observable<Kickerbox[]>;
  isLoading = false;

  constructor(private kickerboxService: KickerboxService,
              private router: Router) {
  }

  ngOnInit() {
    this.getKickerboxes();
  }

  getKickerboxes() {
    this.isLoading = true;
    this.kickerboxes = this.kickerboxService
      .getKickerboxes()
      .pipe(finalize(() => this.isLoading = false));
  }

  gotoAddKickerbox() {
    this.router.navigate(['/kickerboxes/new']);
  }
}
