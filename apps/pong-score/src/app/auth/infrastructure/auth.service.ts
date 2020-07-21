import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUserDto, LoginUserResponse, CreateUserDTO, ResetPasswordDto } from '@pongscore/api-interfaces';
/**
 * Auth Service
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }
  /**
   * Register auth service
   * @param token
   * @returns logout
   */
  register(payload: CreateUserDTO) {
    return this.http.post<LoginUserResponse>('user/create', payload);
  }
  /**
   * Logins auth service
   * @param payload
   * @returns login
   */
  login({ email, password }: LoginUserDto): Observable<LoginUserResponse> {
    return this.http.post<LoginUserResponse>('auth/login', { email, password });
  }
  /**
   * Resets password
   * @param payload
   */
  resetPassword( { currentPassword, email, newPassword, newPasswordToken }: ResetPasswordDto): Observable<LoginUserResponse> {
    return this.http.post<LoginUserResponse>('auth/email/reset-password', { currentPassword, email, newPassword, newPasswordToken });
  }
}
