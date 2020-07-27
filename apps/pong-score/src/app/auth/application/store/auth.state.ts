import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { TranslateService } from '@ngx-translate/core';
import { tap, catchError } from 'rxjs/operators';

import {
  AuthStateModel,
  LogoutAction,
  LoginAction,
  RegisterAction,
  ResetPasswordAction,
  ForgotPasswordAction,
} from './auth.actions';
import { AuthService } from '../../infrastructure/auth.service';

/**
 * State Auth
 */
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    email: null,
  },
})
@Injectable()
export class AuthState {
  /**
   * Selectors auth state
   * @param state
   * @returns token
   */
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }
  /**
   * Selectors auth state
   * @param state
   * @returns true if authenticated
   */
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token || localStorage.getItem('auth.token') !== undefined;
  }
  /**
   * Creates an instance of auth state.
   * @param authService
   */
  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private translate: TranslateService
  ) {}

  private async handleError(error: { error: any }) {
    const toast = await this.toastController.create({
      message: error.error.data.message ? this.translate.instant(error.error.data.message) : error.error.errorMessage,
      duration: 4000,
      color: 'warning',
    });
    return toast.present();
  }

  /**
   * Actions auth state
   * @param ctx
   * @param action
   * @returns
   */
  @Action(LoginAction)
  login(
    { patchState, dispatch }: StateContext<AuthStateModel>,
    action: LoginAction
  ) {
    return this.authService.login(action.payload).pipe(
      tap(async ({ data: { token }, success, errorMessage, message }) => {
        patchState({
          token,
          email: action.payload.email,
        });
        const toast = await this.toastController.create({
          message: this.translate.instant(message),
          duration: 2000,
          color: 'primary',
        });
        toast.present();
        dispatch(new Navigate(['/dashboard']));
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Actions auth state
   * @param ctx
   * @param action
   * @returns
   */
  @Action(RegisterAction)
  register(_: StateContext<AuthStateModel>, action: RegisterAction) {
    return this.authService.register(action.payload).pipe(
      tap(async ({ message }) => {
        const toast = await this.toastController.create({
          message: this.translate.instant(message),
          duration: 2000,
          color: 'primary',
        });
        toast.present();
      }),
      catchError(this.handleError.bind(this))
    );
  }
  /**
   * Actions auth state
   * @param _
   * @param action
   * @returns
   */
  @Action(ForgotPasswordAction)
  forgotPassword(
    _: StateContext<AuthStateModel>,
    action: ForgotPasswordAction
  ) {
    return this.authService.forgotPassword(action.payload).pipe(
      tap(async ({ message }) => {
        const toast = await this.toastController.create({
          message: this.translate.instant(message),
          duration: 2000,
          color: 'primary',
        });
        toast.present();
      }),
      catchError(this.handleError.bind(this))
    );
  }
  /**
   * Actions auth state
   * @param ctx
   * @returns
   */
  @Action(LogoutAction)
  logout({ setState }: StateContext<AuthStateModel>) {
    setState({
      token: null,
      email: null,
    });
  }

  /**
   * Actions auth state
   * @param ctx
   * @returns
   */
  @Action(ResetPasswordAction)
  resetPassword(
    { dispatch }: StateContext<AuthStateModel>,
    action: ResetPasswordAction
  ) {
    return this.authService.resetPassword(action.payload).pipe(
      tap(async ({ message }) => {
        const toast = await this.toastController.create({
          message: this.translate.instant(message),
          duration: 2000,
          color: 'primary',
        });
        toast.present();
        dispatch(new Navigate(['/auth/login']));
      }),
      catchError(this.handleError.bind(this))
    );
  }
}
