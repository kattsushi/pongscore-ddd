import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

/**
 * Register
 *
 * @export
 * @class RegisterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pongscore-register',
  template: `
    <ion-grid fixed>
      <ion-row>
        <ion-col size="12">
          <pongscore-logo></pongscore-logo>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <form #form="ngForm" (ngSubmit)="register(form)" method="post">
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
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col size="12">
          <div class="login">
            <p text-center>Already have a account?</p>
            <ion-button expand="full" color="primary" (click)="goToLogin.emit()">Login</ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styles: [`
    :host {
      width: 100%;
      max-width: 500px;
    }
    @media (min-width: 576px) {
      .login {
        display: none;
      }
      pongscore-logo {
        display: none;
      }
      :host {
        margin-top: 200px;
      }
    }
  `]
})
export class RegisterComponent implements OnInit {

  @Output() goToLogin: EventEmitter<string> = new EventEmitter();
/**
 * Creates an instance of register component.
 * @param modalController
 */
constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }
  /**
   * Dismiss register
   */
  dismissRegister(): void {
    this.modalController.dismiss();
  }
  /**
   * Registers register component
   * @param form
   */
  register(form: any): void {

  }

}
