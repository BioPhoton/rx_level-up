import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class MsgBusService {
  commandsSubject = new Subject<boolean>();
  commands$ = this.commandsSubject.asObservable();
}
