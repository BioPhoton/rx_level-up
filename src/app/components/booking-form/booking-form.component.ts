import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mh-booking-form',
  templateUrl: './booking-form.component.html',
  styles: [
    `
      :host {
        width: 950px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent {
  constructor() {}

  onSubmit() {}
}
