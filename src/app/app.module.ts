import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiModule } from './api/api.module';

import { AppComponent } from './app.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { AppLayoutModule } from './layout/layout.module';
import { GlobalOverlayModule } from './modules/overlay/overlay.module';

export const MATERIAL_MODULES = [
  LayoutModule,
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatProgressSpinnerModule
];

export const OVERLAY__MODULE_CONFIG = {
  outletName: 'global-overlay',
  routes: [
    {
      path: 'booking',
      component: BookingFormComponent
    }
  ]
};

@NgModule({
  declarations: [AppComponent, BookingFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MATERIAL_MODULES,
    FontAwesomeModule,
    AppLayoutModule,
    ApiModule,
    GlobalOverlayModule.forRoot(OVERLAY__MODULE_CONFIG),
    RouterModule.forRoot(
      [
        {
          path: 'test',
          component: BookingFormComponent
        }
      ],
      { useHash: true }
    )
  ],
  providers: [],
  entryComponents: [BookingFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
