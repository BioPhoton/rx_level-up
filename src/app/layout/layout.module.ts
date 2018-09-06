import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MhMainNavComponent} from './mh-main-nav/mh-main-nav.component';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

const COMPONENTS = [MhMainNavComponent];
const DECLARATIONS = [COMPONENTS];
const EXPORTS = [COMPONENTS];

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [DECLARATIONS],
  exports: [EXPORTS]
})
export class AppLayoutModule { }
