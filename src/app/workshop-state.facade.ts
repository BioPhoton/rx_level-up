import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/index';
import { map, shareReplay } from 'rxjs/internal/operators';
import { ApiService } from './api/api.service';
import { Workshop } from './api/model/workshop.model';

@Injectable({
  providedIn: 'root'
})
export class WorkshopFacade {
  private workshopsSubject = new Subject<Workshop[]>();
  private workshops$: Observable<Workshop[]> = this.workshopsSubject.asObservable().pipe(shareReplay(1));

  constructor(private api: ApiService) {}

  load(): void {
    this.api.getWorkshops().subscribe(l => this.workshopsSubject.next(l));
  }

  refreshAll(workshops: Workshop[]): void {
    this.workshopsSubject.next(workshops);
  }

  getAll(): Observable<Workshop[]> {
    return this.workshops$;
  }

  getLatest(count: number): Observable<Workshop[]> {
    return this.workshops$.pipe(
      map(l => l.sort((a, b) => (new Date(a.dateStart).getTime() < new Date(b.dateStart).getTime() ? 1 : -1))),
      map(l => l.slice(0, count))
    );
  }

  getByID(id: string): Observable<Workshop> {
    return this.workshops$.pipe(map(l => l.find(i => i.id === id)));
  }
}
