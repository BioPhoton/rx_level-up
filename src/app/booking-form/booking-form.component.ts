import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MsgBusService } from '../modules/overlay/services/msg-bus.service';

@Component({
  selector: 'mh-booking-form',
  templateUrl: './booking-form.component.html',
  styles: [
    `
      .booking-iframe {
        width: 500px;
      }

      .iframe-close-btn {
        position: absolute;
        right: 20px;
        top: 20px;
      }

      .iframe-loading-spinner {
        position: absolute !important;
        right: calc(50% - 50px);
        top: calc(50% - 50px);
      }

      .iframe-loading-spinner.mat-progress-spinner circle,
      .iframe-loading-spinner.mat-spinner circle {
        stroke: #fff;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BookingFormComponent {
  iframeLoaded = false;

  constructor(private t: MsgBusService) {}

  onLoad(e) {
    this.iframeLoaded = e.returnValue;
  }

  close() {
    this.t.commandsSubject.next(true);
  }
}
