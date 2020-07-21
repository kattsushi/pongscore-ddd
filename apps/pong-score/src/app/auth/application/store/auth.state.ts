import { State, Selector, Action, StateContext } from '@ngxs/store';
import {
  AuthStateModel,
  LogoutAction,
  LoginAction,
  RegisterAction,
  ResetPasswordAction,
} from './auth.actions';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '../../infrastructure/auth.service';
import { Navigate } from '@ngxs/router-plugin';
import { LoginUserResponse } from '@pongscore/api-interfaces';
import { ToastController } from '@ionic/angular';
import { of } from 'rxjs';
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
    public toastController: ToastController
  ) {}
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
          message: 'Logeed.',
          duration: 2000,
          color: 'primary',
        });
        toast.present();
        dispatch(new Navigate(['/dashboard']));
      }),
      catchError(async (err) => {
        const toast = await this.toastController.create({
          message: err.error.data.message,
          duration: 4000,
          color: 'danger',
        });
        return toast.present();
      })
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
      tap(async ({ success }) => {
        if (success) {
          const toast = await this.toastController.create({
            message: 'User have been created.',
            duration: 2000,
            color: 'primary',
          });
          toast.present();
        }
      })
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
      tap(async ({ data }) => {
        let toastMessage;
        if (data) {
          toastMessage = {
            message: 'User have been created.',
            duration: 2000,
            color: 'primary',
          };
        } else {
          toastMessage = {
            message: 'Something was wrong',
            duration: 2000,
            color: 'danger',
          };
        }
        const toast = await this.toastController.create(toastMessage);
        toast.present();
        dispatch(new Navigate(['/auth/login']));
      })
    );
  }
}
