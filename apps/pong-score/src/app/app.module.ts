import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { IonicStorageModule } from '@ionic/storage';
import { UiModule } from '@pongscore/ui';
import { SharedModule, WebpackTranslateLoader } from '@pongscore/shared';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { environment } from '../environments/environment';

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
        useClass: WebpackTranslateLoader
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
