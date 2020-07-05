import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'pongscore-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent implements OnInit, OnDestroy {
  prefersDark: any = window.matchMedia('(prefers-color-scheme: dark)');
  constructor() {}

  ngOnDestroy(): void {
    this.prefersDark.removeListener('mediaQuery');
  }

  ngOnInit(): void {
    this.toggleDarkTheme(this.prefersDark.matches);
    // Listen for changes to the prefers-color-scheme media query
    this.prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
  }

  toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }

}
