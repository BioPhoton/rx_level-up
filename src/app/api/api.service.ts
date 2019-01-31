import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { VERSION } from '../../environments/version';
import { Location, Workshop } from './model';
import { Talk } from './model/talk.model';
import { Testemonial } from './model/testemonial.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://cdn.jsdelivr.net/gh/BioPhoton/rx_level-up';
  contentFolder = 'content';

  constructor(private http: HttpClient) {}

  private getUrl(contentType: string) {
    return [
      [this.baseUrl, VERSION.branchName === 'master' ? VERSION.version : VERSION.branchName].join('@'),
      'content',
      contentType,
      contentType + '.json'
    ].join('/');
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.getUrl('location'));
  }

  getWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(this.getUrl('workshop'));
  }

  getTalks(): Observable<Talk[]> {
    return this.http.get<Talk[]>(this.getUrl('talk'));
  }

  getTestemonials(): Observable<Testemonial[]> {
    return this.http.get<Testemonial[]>(this.getUrl('testemonial'));
  }
}
