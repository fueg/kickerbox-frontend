import {Component, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private location: Location) {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    const currentRoute = this.router.url;
    if (currentRoute.substr(1, currentRoute.length).includes('/')) {
      if (event.key === 'c') {
        this.location.back();
      }
    }
    if (event.key === 'n') {
      this.router.navigate(['reservations/new']);
    }
    if (event.key === 'r') {
      this.router.navigate(['results/new']);
    }
    if (event.key === 't') {
      this.router.navigate(['teams/new']);
    }
  }
}
