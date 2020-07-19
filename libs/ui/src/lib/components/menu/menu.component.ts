import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pongscore-menu',
  template: `
      <ion-header>
        <ion-toolbar color="primary">
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
      margin-top: 56px;
      height: 100%
    }
  `]
})
export class MenuComponent implements OnInit {
  @Input()
  contentId!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
