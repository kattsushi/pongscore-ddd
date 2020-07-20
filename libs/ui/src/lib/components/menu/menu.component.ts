import { Component, OnInit, Input } from '@angular/core';
/**
 * Component
 */
@Component({
  selector: 'pongscore-menu',
  template: `
      <ion-header>
        <ion-toolbar>
          <ion-title>Start Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
        </ion-list>
      </ion-content>
  `,
  styles: [`
    :host {
      height: 100%
    }
  `]
})
export class MenuComponent implements OnInit {
  /**
   * Input  of menu component
   */
  @Input()
  contentId!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
