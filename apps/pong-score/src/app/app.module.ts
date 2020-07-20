import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { UiModule } from '@pongscore/ui';
import { SharedModule } from '@pongscore/shared';
import { environment } from '../environments/environment';
/**
 * Ng module
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule.forRoot(environment),
    UiModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    }),
    NgxsModule.forRoot([]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
