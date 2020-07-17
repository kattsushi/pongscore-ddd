/**
 * Auth state model
 */
export interface AuthStateModel {
  token: string | null;
  username: string | null;
}
/**
 * Login
 */
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}
/**
 * Logout
 */
export class Logout {
  static readonly type = '[Auth] Logout';
}
