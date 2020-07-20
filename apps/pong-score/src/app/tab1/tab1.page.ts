import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LogoutAction } from '../auth/application/store/auth.actions';
import { AuthState } from '../auth/application/store/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'pongscore-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @Select(AuthState.isAuthenticated)
  isAuthenticated$!: Observable<boolean>;
  constructor(
    private store: Store
  ) {}

  public logout() {
    this.store.dispatch(new LogoutAction());
  }
}
