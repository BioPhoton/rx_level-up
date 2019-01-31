import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookingFormComponent } from './components/booking-form/booking-form.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalOverlayService implements OnDestroy {
  onDestroySubject = new Subject<boolean>();
  onDestroy$ = this.onDestroySubject;

  overlayRef: OverlayRef;

  bookingFormPortal: ComponentPortal;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      panelClass: 'global-overlay',
      hasBackdrop: true,
      disposeOnNavigation: true
    } as OverlayConfig);

    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(n => this.close());

    this.bookingFormPortal = new ComponentPortal<BookingFormComponent>(BookingFormComponent);
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(true);
  }

  open() {
    this.overlayRef.attach(this.bookingFormPortal);
  }

  close() {
    this.overlayRef.detach();
  }
}
