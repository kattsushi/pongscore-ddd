import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Translations } from '@pongscore/shared';

@Component({
  selector: 'pongscore-modal',
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>{{ translations.AUTH.FORGOT_PASSWORD.FORGOT_PASSWORD | translate }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">{{ translations.AUTH.FORGOT_PASSWORD.CLOSE | translate }}</ion-button>
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
    private modalController: ModalController,
    public translations: Translations
  ) { }

  ngOnInit(): void {
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
