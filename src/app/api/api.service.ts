import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getData() {
    const url1 = 'https://cdn.rawgit.com/angular/angular-phonecat/master/app/phones/phones.json';
    const url2 = 'https://cdn.rawgit.com/UltimateAngular/angularconferences.github.io/master/_data/conferences.json';
    return this.http.get(url2);
  }
}
