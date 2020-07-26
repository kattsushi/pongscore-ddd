import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { IonicStorageModule } from '@ionic/storage';
import { UiModule } from '@pongscore/ui';
import { SharedModule, HttpLoaderFactory } from '@pongscore/shared';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/app/', '.json');
}

/**
 * Ng module
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: false
    }),
    SharedModule.forRoot(environment),
    UiModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    }),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
