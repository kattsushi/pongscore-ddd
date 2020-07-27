import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ApiInterceptorService } from './interceptors/api-interceptor.service';
import { from, of } from 'rxjs';

import { es, en } from '@pongscore/api-interfaces';
import { Translations } from './services/translations.service';

const TRANSLATIONS: any = {
  en: en,
  es: es
};

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string) {
    return from(of(TRANSLATIONS[lang]));
  }
}
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      },
      isolate: false
    })
  ],
  exports: [
    CommonModule,
    TranslateModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
    Translations
  ]
})
export class SharedModule {
  static forRoot(environment: any): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ApiInterceptorService,
        { provide: 'environment', useValue: environment },
        Translations
      ]
    };
  }
}
