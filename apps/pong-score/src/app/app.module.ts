import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    }),
    RouterModule.forRoot([{
      path: 'auth',
      loadChildren: () => import('@pongscore/auth').then(m => m.AuthModule)
    }, {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },{
      path: '', redirectTo: 'auth', pathMatch: 'full'
    }])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
