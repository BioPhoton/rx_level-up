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

    // @TODO find better way to communicate from portal to service
    this.msgS.commands$.subscribe(n => {
      this.close();
    });
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
      .subscribe(n => this.close());

    return ref;
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(true);
  }

  open<T>(classRef) {
    this.overlayRef.attach(new ComponentPortal<T>(classRef));
  }

  close() {
    this.overlayRef.detach();
  }

  openViaNavigation<T>(path: string = '') {
    this.router.navigate([
      {
        outlets: {
          [this.goC.outletName]: [path]
        }
      }
    ]);
  }

  closeViaNavigation<T>() {
    this.router.navigate([
      {
        outlets: {
          [this.goC.outletName]: null
        }
      }
    ]);
  }
}
