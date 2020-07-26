import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UiModule } from '@pongscore/ui';
import { SharedModule } from '@pongscore/shared';

import { LoginComponent } from '../presentation/login/login.component';
import { RegisterComponent } from '../presentation/register/register.component';
import { AuthState } from '../application/store/auth.state';
import { AuthRoutingModule } from './auth.routing';
import { AuthGuard } from '../application/auth.guard';
import { AuthComponent } from '../presentation/auth/auth.component';
import { ForgotPasswordComponent } from '../presentation/forgot-password/forgot-password.component';
import { ModalComponent } from '../presentation/modal/modal.component';
import { ResetPasswordComponent } from '../presentation/reset-password/reset-password.component';
import { environment } from '../../../environments/environment';

const COMPONENTS = [
  LoginComponent,
  RegisterComponent,
  AuthComponent,
  ForgotPasswordComponent,
  ModalComponent,
  ResetPasswordComponent,
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/auth/', '.json');
}

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
      mode: 'md',
    }),
    NgxsModule.forFeature([AuthState]),
  ],
  declarations: [...COMPONENTS],
  providers: [AuthState, AuthGuard],
})
export class AuthModule {}
