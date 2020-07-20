import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pongscore-forgot-password',
  template: `
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <pongscore-logo></pongscore-logo>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col></ion-col>
        <ion-col size="8">
          <form #form="ngForm" (ngSubmit)="sendRequest(form)" method="post">
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input ngModel type="email" name="email"></ion-input>
            </ion-item>
            <ion-button type="submit" expand="full" color="primary">Send Request Password</ion-button>
          </form>
        </ion-col>
        <ion-col></ion-col>
      </ion-row>
    </ion-grid>
  `,
  styles: [`
    :host {
      width: 100%;
    }
  `]
})
export class ForgotPasswordComponent implements OnInit {
  @Output() goToLogin: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  sendRequest(ev: any) {

  }
}
