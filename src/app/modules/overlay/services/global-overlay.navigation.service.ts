import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GlobalOverlayModuleConfig } from '../interfaces/global-overlay-module-config.interface';
import { GLOBAL_OVERLAY_CONFIG_TOKEN } from '../tokens/global-overlay-module-config.token';
import { MsgBusService } from './msg-bus.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalOverlayNavigationService implements OnDestroy {
  onDestroySubject = new Subject<boolean>();
  onDestroy$ = this.onDestroySubject;

  constructor(
    private router: Router,
    @Inject(GLOBAL_OVERLAY_CONFIG_TOKEN) private goC: GlobalOverlayModuleConfig,
    // @TODO find better way to communicate from portal to service
    private msgS: MsgBusService
  ) {}

  init() {
    const closeOverlay$ = this.msgS.commands$.pipe(
      tap(n => {
        this.closeViaNavigation();
      })
    );

    merge(closeOverlay$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  openViaNavigationByClassRef(classRef) {
    this.openViaNavigation(this.getPathByClassRef(classRef));
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

  private getPathByClassRef(classRef): string {
    return (
      this.router.config
        // filter out related outlet
        .filter(r => 'outlet' in r && r.outlet === this.goC.outletName)
        // get child routes
        .map(r => r.children)
        .flatMap(x => x)
        // filter ou all routes with portal in data
        .filter(r => 'data' in r && 'portal' in r.data && r.data.portal.name === classRef.name)
        .pop().path
    );
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next(true);
  }
}
