import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthStateModel, Login, Logout } from './auth.actions';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../infrastructure/auth.service';
/**
 * State Auth
 */
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
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
    return !!state.token;
  }
  /**
   * Creates an instance of auth state.
   * @param authService
   */
  constructor(private authService: AuthService) {}
  /**
   * Actions auth state
   * @param ctx
   * @param action
   * @returns
   */
  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: { token: string }) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.username
        });
      })
    );
  }
  /**
   * Actions auth state
   * @param ctx
   * @returns
   */
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logout(state.token).pipe(
      tap(() => {
        ctx.setState({
          token: null,
          username: null
        });
      })
    );
  }
}