import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  login({ email, password }: { email: string; password: string; }): Observable<any> {
    return this.http.post('http://localhost:3333/auth/login', { email, password });
  }
}
