import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Router } from '@angular/router';
import { Logout } from './auth/application/store/auth.actions';
@Component({
  selector: 'pongscore-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent implements OnInit, OnDestroy {
  prefersDark: any = window.matchMedia('(prefers-color-scheme: dark)');
  constructor(
    private actions: Actions, private router: Router
  ) {}

  ngOnDestroy(): void {
    // this.prefersDark.removeListener('mediaQuery');
  }

  ngOnInit(): void {
    this.toggleDarkTheme(this.prefersDark.matches);
    // Listen for changes to the prefers-color-scheme media query
    this.prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));


    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }

}
