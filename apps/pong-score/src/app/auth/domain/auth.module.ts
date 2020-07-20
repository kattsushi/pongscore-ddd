import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxsModule } from '@ngxs/store';
import { IonicModule } from '@ionic/angular';
import { UiModule } from '@pongscore/ui';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@pongscore/shared';

import { LoginComponent } from '../presentation/login/login.component';
import { RegisterComponent } from '../presentation/register/register.component';
import { AuthState } from '../application/store/auth.state';
import { AuthRoutingModule } from './auth.routing';
import { AuthGuard } from '../application/auth.guard';
import { AuthComponent } from '../presentation/auth/auth.component';
import { ForgotPasswordComponent } from '../presentation/forgot-password/forgot-password.component';
import { ModalComponent } from '../presentation/modal/modal.component';
import { environment } from '../../../environments/environment';
/**
 * Auth Ng module
 */
@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    UiModule,
    SharedModule.forRoot(environment),
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    }),
    NgxsModule.forFeature([AuthState])
  ],
  declarations: [LoginComponent, RegisterComponent, AuthComponent, ForgotPasswordComponent, ModalComponent],
  providers: [AuthState, AuthGuard]
})
export class AuthModule { }
