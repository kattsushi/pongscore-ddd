import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { SharedModule } from '@pongscore/shared';

import { LogoComponent } from './components/logo/logo.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule.forRoot({}),
    NgxFlagPickerModule
  ],
  declarations: [LogoComponent, SettingsComponent, MenuComponent, HeaderComponent],
  exports: [LogoComponent, SettingsComponent, MenuComponent, HeaderComponent],
})
export class UiModule { }
