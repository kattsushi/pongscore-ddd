import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [LogoComponent],
  exports: [LogoComponent],
})
export class UiModule {}
