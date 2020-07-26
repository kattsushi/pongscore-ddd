import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * Component
 */
@Component({
  selector: 'pongscore-menu',
  template: `
      <ion-header>
        <ion-toolbar>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>{{ 'MENU.DARK-MODE' | translate }}</ion-label>
            <ion-toggle [ngModel]="isDarkMode" (ionChange)="toggleDark($event)"></ion-toggle>
          </ion-item>
        <ion-item lines="full">
          <ion-label>{{ 'MENU.SELECT-LENGUAJE' | translate }}</ion-label>
          <ngx-flag-picker
            [selectedCountryCode]="selectedLang"
            [countryCodes]="langCodes"
            (changedCountryCode)="setLang($event)">
          </ngx-flag-picker>
        </ion-item>
      </ion-list>
      </ion-content>
  `,
  styles: [`
    :host {
      height: 100%
    }
    ion-list {
      height: 100%;
    }
    ion-item {
      overflow: visible;
    }
  `]
})
export class MenuComponent implements OnInit {
  /**
   * Input  of menu component
   */
  @Input()
  contentId!: string;
  @Input()
  isDarkMode!: boolean;
  @Output()
  toggle: EventEmitter<boolean> = new EventEmitter();

  langCodes: string[] = [];
  selectedLang = '';
  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.selectedLang = this.translate.getDefaultLang() === 'en' ? 'us' : this.translate.getDefaultLang();
    this.langCodes = this.translate.getLangs().map(lang => lang === 'en' ? 'us' : lang);
  }

  setLang(lang: any) {
    this.translate.use(lang === 'us' ? 'en' : lang);
  }

  toggleDark(event: any) {
    this.toggle.emit(event.detail.checked);
  }
}
