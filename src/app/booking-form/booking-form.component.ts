import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MsgBusService } from '../modules/overlay/services/msg-bus.service';

@Component({
  selector: 'mh-booking-form',
  templateUrl: './booking-form.component.html',
  styles: [
    `
      :host {
        width: 950px;
      }

      .booking-iframe-wrapper {
        padding: 0px;
      }

      .booking-iframe {
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent {
  constructor(private t: MsgBusService) {}

  close() {
    this.t.commandsSubject.next(true);
  }
}
