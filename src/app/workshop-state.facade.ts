import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/index';
import {map, shareReplay} from 'rxjs/internal/operators';
import {ApiService} from './api/api.service';
import {Workshop} from './api/model/workshop.model';

@Injectable({
  providedIn: 'root'
})
export class WorkshopFacade {

  private workshopsSubject = new Subject();
  private workshops$: Observable<Workshop[]> = this.workshopsSubject
    .asObservable()
    .pipe(
      shareReplay(1)
    );

  constructor(private api: ApiService) {

  }

  load() {
    this.api.getWorkshops()
      .subscribe(
        l => this.workshopsSubject.next(l)
      );
  }

  refreshAll(workshops: Workshop[]) {
    this.workshopsSubject.next(workshops);
  }

  getAll() {
    return this.workshops$;
  }

  getLatest(count: number): Observable<Workshop[]> {
    return this.workshops$
      .pipe(
        map(l => l.sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime()),
          map(l => l.slice(0, count)))
      );
  }

  getByID(id: number): Observable<Workshop> {
    return this.workshops$
      .pipe(
        map(l => l.find(i => i.id === id))
      );
  }

}
