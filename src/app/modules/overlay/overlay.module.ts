import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { RouterDummyComponent } from './components/router-dummy/router-dummy.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { GlobalOverlayModuleConfig } from './interfaces/global-overlay-module-config.interface';
import { GlobalOverlayNavigationService } from './services/global-overlay.navigation.service';
import { GLOBAL_OVERLAY_CONFIG_TOKEN } from './tokens/global-overlay-module-config.token';

export const DEFAULT_OUTLET_NAME = 'global-overlay';
export const OVERLAY_ROUTE = {
  component: RouterDummyComponent,
  canActivate: [CanActivateGuard],
  canDeactivate: [CanDeactivateGuard]
};

@NgModule({
  declarations: [RouterDummyComponent],
  imports: [CommonModule, OverlayModule],
  exports: [RouterDummyComponent],
  entryComponents: []
})
export class GlobalOverlayModule {
  static forRoot(config: GlobalOverlayModuleConfig): ModuleWithProviders {
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

  constructor(
    @Inject(GLOBAL_OVERLAY_CONFIG_TOKEN) private moduleConfig: GlobalOverlayModuleConfig,
    private router: Router,
    private goNS: GlobalOverlayNavigationService
  ) {
    if (moduleConfig.routes && moduleConfig.routes.length) {
      this.router.config = [...this.router.config, this.getRoute(moduleConfig)];
    }
    this.goNS.init();
  }

  getRoute(config: GlobalOverlayModuleConfig): Route {
    return {
      outlet: config.outletName || DEFAULT_OUTLET_NAME,
      path: '',
      children: this.getPrepareRoutes(config.routes)
    };
  }

  getPrepareRoutes(routes: Routes) {
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
}
