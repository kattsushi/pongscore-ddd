import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout(token: string): Observable<any> {
    throw new Error("Method not implemented.");
  }
  login(payload: { username: string; password: string; }): Observable<any> {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
