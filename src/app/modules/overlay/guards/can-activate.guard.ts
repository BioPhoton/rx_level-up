import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/index';
import { OverlayRouteData } from '../interfaces/overlay-route-data';
import { GlobalOverlayService } from '../services/global-overlay.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  constructor(private gOS: GlobalOverlayService) {}

  // If triggered take Component from data and open it
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeData = route.data as OverlayRouteData;
    if (routeData.portal) {
      this.gOS.open(routeData.portal);
    }
    return true;
  }
}
