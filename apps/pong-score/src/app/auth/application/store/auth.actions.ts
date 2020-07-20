import { LoginUserDto, CreateUserDTO } from '@pongscore/api-interfaces';

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
  constructor(public payload: LoginUserDto) { }
}
/**
 * Logout
 */
export class LogoutAction {
  static readonly type = '[Auth] Logout';
}

/**
 * Login
 */
export class RegisterAction {
  static readonly type = '[Auth] Register';
  constructor(public payload: CreateUserDTO) { }
}
