import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './components/logo/logo.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [LogoComponent, SettingsComponent],
  exports: [LogoComponent, SettingsComponent],
})
export class UiModule {}
