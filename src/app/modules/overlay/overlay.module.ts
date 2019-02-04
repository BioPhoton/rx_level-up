import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { RouterDummyComponent } from './components/router-dummy/router-dummy.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { GlobalOverlayModuleConfig } from './interfaces/global-overlay-module-config.interface';
import { GLOBAL_OVERLAY_CONFIG_TOKEN } from './tokens/global-overlay-module-config.token';

export const OVERLAY_ROUTE = {
  component: RouterDummyComponent,
  canActivate: [CanActivateGuard],
  canDeactivate: [CanDeactivateGuard]
};

function getPrepareRoutes(routes: Routes) {
  return (
    routes
      // Replace component with dummy and apply component as route data
      .map(r => ({
        ...OVERLAY_ROUTE,
        path: r.path,
        data: {
          portal: r.component
        }
      }))
  );
}

@NgModule({
  declarations: [RouterDummyComponent],
  imports: [CommonModule, OverlayModule],
  exports: [RouterDummyComponent],
  entryComponents: []
})
export class GlobalOverlayModule {
  static outletName = '';

  static forRoot(config: GlobalOverlayModuleConfig): ModuleWithProviders {
    GlobalOverlayModule.outletName = config.outletName || '';
    return {
      ngModule: GlobalOverlayModule,
      providers: [
        {
          provide: GLOBAL_OVERLAY_CONFIG_TOKEN,
          useValue: config
        }
      ]
    };
  }

  static getRoute(routes: Routes): Route {
    console.log('GlobalOverlayModule.outletName', GlobalOverlayModule.outletName);
    return {
      outlet: GlobalOverlayModule.outletName,
      path: '',
      children: getPrepareRoutes(routes)
    };
  }

  constructor() {}
}
