import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'pongscore-register',
  template: `
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="primary">
            <ion-button>
              <ion-icon slot="icon-only" ios="ellipsis-horizontal" md="ellipsis-vertical"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-title>Register</ion-title>
        </ion-toolbar>
      </ion-header>
    <ion-content class="ion-padding">
      <form #form="ngForm" (ngSubmit)="register(form)" method="post">
        <pongscore-logo></pongscore-logo>
        <ion-item>
          <ion-label position="floating">First Name</ion-label>
          <ion-input ngModel name="fName"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Last Name</ion-label>
          <ion-input ngModel name="lName"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" ngModel name="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input type="password" ngModel name="password"></ion-input>
        </ion-item>

        <ion-button type="submit" expand="full" color="secondary">Register</ion-button>
      </form>
      <p text-center>Already have a account?</p>
      <ion-button expand="full" color="primary" (click)="dismissRegister()">Login</ion-button>
    </ion-content>
  `,
  styles: [``]
})
export class RegisterComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  dismissRegister(): void {
    this.modalController.dismiss();
  }

  register(form): void {

  }

}
