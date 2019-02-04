import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { MhMainNavComponent } from './mh-main-nav/mh-main-nav.component';

const COMPONENTS = [MhMainNavComponent];
const DECLARATIONS = [COMPONENTS];
const EXPORTS = [COMPONENTS];

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule],
  declarations: [DECLARATIONS],
  exports: [EXPORTS]
})
export class AppLayoutModule {}
