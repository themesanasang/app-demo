import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';

@NgModule({
  imports: [
      HttpClientModule
  ],
  providers: [
      AuthGuard,
      NoAuthGuard,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}