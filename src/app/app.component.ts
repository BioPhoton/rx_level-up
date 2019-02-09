import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Workshop } from './api/model/index';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { GlobalOverlayService } from './modules/overlay/services/global-overlay.service';
import { WorkshopFacade } from './workshop-state.facade';

interface Quote {
  author: string;
  authorAvatar?: string;
  text: string;
  contextName?: string;
  contextImage?: string;
  contextLink?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  quotes: Quote[] = [
    {
      author: 'ngTalks',
      text:
        'New conference talk video on NgTalks channel. ' +
        'Michael Hladky - Crafting solid state management - A principle-based architecture.',
      contextImage: 'https://lh3.google.com/u/0/d/1_9ISgf4Ovg-CJq5b6_3EXvntA0ResLtP=w1895-h889-iv2',
      contextName: '@ngtalks_ua First ever #angular conference in Ukraine!'
    },
    {
      author: 'siemens',
      text: 'After the trainings we had confidence to start a large' + ' scale app with RxJS.',
      contextImage: 'https://www.koeln-kundendienst.de/wp-content/uploads/2016/10/Siemens-logo.png',
      contextName: 'siemens'
    },
    {
      author: 'continental',
      text: 'The provided consulting helped us to structure our code and saved us a lot of money.',
      contextImage: 'https://logos-download.com/wp-content/uploads/2016/05/Continental_logo_black.png',
      contextName: 'continental'
    }
  ];

  workshops$: Observable<Workshop[]>;

  constructor(private wF: WorkshopFacade, private goS: GlobalOverlayService) {
    this.wF.load();
    this.workshops$ = this.wF.getAll();
  }

  openByClass() {
    this.goS.open(BookingFormComponent);
  }

  openByPath() {
    this.goS.openViaNavigation('booking');
  }
}
