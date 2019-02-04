import { InjectionToken } from '@angular/core';
import { GlobalOverlayModuleConfig } from '../interfaces/global-overlay-module-config.interface';

export const GLOBAL_OVERLAY_CONFIG_TOKEN = new InjectionToken<GlobalOverlayModuleConfig>(
  'GlobalOverlayModuleConfigToken'
);
