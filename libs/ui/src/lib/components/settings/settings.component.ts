import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
/**
 * Settings
 *
 * @export
 * @class SettingsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pongscore-settings',
  template: `
    <ion-list>
      <ion-item>
        <ion-label>Dark Mode</ion-label>
        <ion-toggle (ngModelChange)="changeMode()" [(ngModel)]="darkmode"></ion-toggle>
      </ion-item>

      <ion-item>
        <ion-button slot="end" color="primary" expand="full" (click)="logout()">Logout</ion-button>
      </ion-item>
    </ion-list>
  `,
  styles: [
  ]
})
export class SettingsComponent implements OnInit {
  @Input()
  darkmode = false;
  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit(): void {
  }
  /**
   * Logouts settings component
   */
  public logout() {
    this.popover.dismiss('logout');
  }
  /**
   * Changes mode
   */
  public changeMode() {
    this.popover.dismiss('darkmode');
  }
}
