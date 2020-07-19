import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Router } from '@angular/router';
import { LogoutAction } from './auth/application/store/auth.actions';

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
    <ion-app>
      <ion-split-pane class="custom-pane" contentId="main">

        <ion-menu class="my-custom-menu" side="start" menuId="first" contentId="main">
          <pongscore-menu></pongscore-menu>
        </ion-menu>
        <ion-content id="main">
          <ion-header>
            <ion-toolbar>
              <ion-menu-button slot="start"></ion-menu-button>
            </ion-toolbar>
          </ion-header>
          <ion-router-outlet id="main"></ion-router-outlet>
        </ion-content>
      </ion-split-pane>
    </ion-app>
  `,
  styles: [`
    .custom-pane {
      --side-max-width: 20%;
      --border: 2px solid rgba(555,555,555, 0.2);
    }
  `],
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

    this.actions.pipe(ofActionDispatched(LogoutAction)).subscribe(() => {
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
