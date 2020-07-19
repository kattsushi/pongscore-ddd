import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'pongscore-modal',
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Forgot Password</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <pongscore-forgot-password></pongscore-forgot-password>
    </ion-content>
  `,
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
