import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor() { }
  /**
   * Logouts auth service
   * @param token
   * @returns logout
   */
  logout(token: string | null): Observable<any> {
    throw new Error("Method not implemented.");
  }
  /**
   * Logins auth service
   * @param payload
   * @returns login
   */
  login(payload: { username: string; password: string; }): Observable<any> {
    throw new Error("Method not implemented.");
  }
}
