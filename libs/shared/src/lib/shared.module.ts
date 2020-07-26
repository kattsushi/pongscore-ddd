import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiInterceptorService } from './interceptors/api-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [
    CommonModule,
    TranslateModule,
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
