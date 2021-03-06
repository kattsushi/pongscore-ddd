import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

/**
 * Logo Component
 *
 * @export
 * @class LogoComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'pongscore-logo',
  template: `
    <ion-img class="ion-align-items-center" [src]="src"></ion-img>
  `,
  styles: [`
    ion-img {
      width: 200px;
      margin: 0 auto;
      margin-top: 25px;
      margin-bottom: 40px;
    }
  `]
})
export class LogoComponent implements OnInit, OnDestroy {
  /**
   * Src  of logo component
   */
  public src = 'assets/img/logo.svg';
  /**
   * Prefers dark of logo component
   */
  private prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  /**
   * Creates an instance of logo component.
   * @param cn
   */
  constructor(private cn: ChangeDetectorRef) { }
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

    const mutationObserver = new MutationObserver((mutationsList: any, observer: any) => {
      mutationsList.forEach((mutation: any) => {
        if (mutation.attributeName === 'class') {
          this.toggleDarkTheme(mutation.target.className.includes('dark'));
        }
      });
    });

    mutationObserver.observe(
      document.body,
      { attributes: true }
    );
  }
  /**
   * Toggles dark theme
   * @param matches
   */
  toggleDarkTheme(matches: boolean) {
    if (matches) {
      this.src = 'assets/img/logo-dark.svg';
    } else {
      this.src = 'assets/img/logo.svg';
    }
    this.cn.detectChanges();
  }
}
