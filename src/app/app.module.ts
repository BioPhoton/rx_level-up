import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatGridListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiModule } from './api/api.module';

import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/layout.module';

export const MATERIAL_MODULES = [LayoutModule, MatCardModule, MatButtonModule, MatGridListModule];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MATERIAL_MODULES, FontAwesomeModule, AppLayoutModule, ApiModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
