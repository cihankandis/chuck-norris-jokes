import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, HttpClientModule],
  exports: [],
  declarations: [],
  providers: [AuthService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
