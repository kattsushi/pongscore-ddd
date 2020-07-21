import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  LoginUserDto,
  LoginUserResponse,
  CreateUserDto,
  ResetPasswordDto,
  IResponse,
  User,
} from '@pongscore/api-interfaces';
/**
 * Auth Service
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  /**
   * Register auth service
   * @param token
   * @returns logout
   */
  register(payload: CreateUserDto): Observable<IResponse<User>> {
    return this.http.post<IResponse<User>>('auth/email/register', payload);
  }
  /**
   * Logins auth service
   * @param payload
   * @returns login
   */
  login({
    email,
    password,
  }: LoginUserDto): Observable<IResponse<LoginUserResponse>> {
    return this.http.post<IResponse<LoginUserResponse>>('auth/email/login', {
      email,
      password,
    });
  }
  /**
   * Resets password
   * @param payload
   */
  resetPassword({
    currentPassword,
    email,
    newPassword,
    newPasswordToken,
  }: ResetPasswordDto): Observable<IResponse<boolean>> {
    return this.http.post<IResponse<boolean>>('auth/email/reset-password', {
      currentPassword,
      email,
      newPassword,
      newPasswordToken,
    });
  }
}
