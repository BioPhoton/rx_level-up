import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {VERSION} from '../../environments/version';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://cdn.jsdelivr.net/gh/BioPhoton/rx_level-up';
  contentFolder = 'content';

  constructor(private http: HttpClient) {
  }

  private getUrl(contentType: string) {
    return [
      this.baseUrl,
      VERSION.version,
      contentType,
      contentType + '.json'
    ].join('/');
  }

  getWorkshops() {
    return this.http.get(this.getUrl('workshop'));
  }

  getLocations() {
    return this.http.get(this.getUrl('location'));
  }
}
