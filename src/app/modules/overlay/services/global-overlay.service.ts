import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalOverlayModuleConfig } from '../interfaces/global-overlay-module-config.interface';
import { GLOBAL_OVERLAY_CONFIG_TOKEN } from '../tokens/global-overlay-module-config.token';
import { MsgBusService } from './msg-bus.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalOverlayService implements OnDestroy {
  onDestroySubject = new Subject<boolean>();
  onDestroy$ = this.onDestroySubject;

  overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private router: Router,
    @Inject(GLOBAL_OVERLAY_CONFIG_TOKEN) private goC: GlobalOverlayModuleConfig,
    private msgS: MsgBusService
  ) {
    this.overlayRef = this.createOverlayRef();
  }

  private createOverlayRef(): OverlayRef {
    const ref = this.overlay.create({
      panelClass: this.goC.outletName,
      hasBackdrop: true,
      disposeOnNavigation: true
    } as OverlayConfig);

    ref
      .backdropClick()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(n => this.msgS.commandsSubject.next(true));

    return ref;
  }

  open<T>(classRef) {
    this.overlayRef.attach(new ComponentPortal<T>(classRef));
  }

  close() {
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(true);
  }
}
