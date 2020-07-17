import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Router } from '@angular/router';
import { Logout } from './auth/application/store/auth.actions';

/**
 * Root Component
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'pongscore-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Prefers dark of app component
   */
  private prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

  /**
   * Creates an instance of app component.
   * @param actions
   * @param router
   */
  constructor(
    private actions: Actions,
    private router: Router
  ) {}

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    // this.prefersDark.removeListener('mediaQuery');
  }

  /**
   * on init
   */
  ngOnInit(): void {
    this.toggleDarkTheme(this.prefersDark.matches);
    // Listen for changes to the prefers-color-scheme media query
    this.prefersDark.addEventListener('change', (mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));

    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  /**
   * Toggles dark theme
   * @param shouldAdd
   */
  toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }

}
