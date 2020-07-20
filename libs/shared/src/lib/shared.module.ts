import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './interceptors/api-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  exports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true,
  }
  ]
})
export class SharedModule {
  static forRoot(environment: any): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ApiInterceptorService,
        { provide: 'environment', useValue: environment },
      ]
    };
  }
}
