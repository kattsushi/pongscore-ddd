import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
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
  @Input() darkmode: boolean;
  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.popover.dismiss('logout');
  }

  public changeMode() {
    this.popover.dismiss('darkmode');
  }

}
