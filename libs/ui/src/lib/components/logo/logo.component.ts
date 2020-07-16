import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'pongscore-logo',
  template: `
    <ion-img class="ion-align-items-center" [src]="src"></ion-img>
  `,
  styles: [`
    ion-img {
      width: 100px;
      margin: 0 auto;
      margin-top: 25px;
      margin-bottom: 40px;
    }
  `]
})
export class LogoComponent implements OnInit, OnDestroy {
  src = 'assets/img/logo.svg';
  prefersDark: any = window.matchMedia('(prefers-color-scheme: dark)');
  constructor(private cn: ChangeDetectorRef) { }
  ngOnDestroy(): void {
    // this.prefersDark.removeListener('mediaQuery');
  }

  ngOnInit(): void {
    this.toggleDarkTheme(this.prefersDark.matches);
    // Listen for changes to the prefers-color-scheme media query
    this.prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
  }
  toggleDarkTheme(matches: boolean) {
    if (matches) {
      this.src = 'assets/img/logo-dark.svg';
    } else {
      this.src = 'assets/img/logo.svg';
    }
    this.cn.detectChanges();
  }


}
