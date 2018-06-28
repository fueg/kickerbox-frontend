import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {Kickerbox, kickerboxes} from '../data-model';

@Injectable({
  providedIn: 'root'
})
export class KickerboxService {

  getKickerboxes(): Observable<Kickerbox[]> {
    return of(kickerboxes);
  }

  findKickerboxById(kickerboxList: Kickerbox[], id: number) {
    return kickerboxList.find((kickerbox) => kickerbox.id === id);
  }

  createKickerbox(kickerbox: Kickerbox): Observable<null> {
    kickerboxes.push(kickerbox);
    return of();
  }
}
