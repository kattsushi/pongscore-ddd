import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../application/store/auth.state';
/**
 * Auth Guard
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of auth guard.
   * @param store
   */
  constructor(private store: Store) {}
  /**
   * Determines whether activate can
   * @param next
   * @param state
   * @returns activate
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    return isAuthenticated;
  }

}
