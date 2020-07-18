/**
 * Auth state model
 */
export interface AuthStateModel {
  token: string | null;
  email: string | null;
}
/**
 * Login
 */
export class LoginAction {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}
/**
 * Logout
 */
export class LogoutAction {
  static readonly type = '[Auth] Logout';
}
