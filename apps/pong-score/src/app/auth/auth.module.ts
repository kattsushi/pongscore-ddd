import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { IonicModule} from '@ionic/angular';
import { UiModule } from '@pongscore/ui';

import { LoginComponent } from './presentation/login/login.component';
import { RegisterComponent } from './presentation/register/register.component';
import { AuthState } from './application/store/auth.state';
import { AuthRoutingModule } from './auth.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './infrastructure/auth.guard';
/**
 * Auth Ng module
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    UiModule,
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    }),
    NgxsModule.forFeature([AuthState])
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  providers: [AuthState, AuthGuard]
})
export class AuthModule {}
