import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterComponent } from '../register/register.component';
import { Store } from '@ngxs/store';
import { LoginAction } from '../../application/store/auth.actions';

/**
 * Login Component
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pongscore-login',
  template: `
    <ion-app>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="primary">
            <ion-button>
              <ion-icon slot="icon-only" ios="ellipsis-horizontal" md="ellipsis-vertical"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <form #form="ngForm" (ngSubmit)="login(form)" method="post">
          <pongscore-logo></pongscore-logo>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input ngModel type="email" name="email"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input ngModel type="password" name="password"></ion-input>
          </ion-item>

          <p text-right>Forgot Password?</p>

          <ion-button type="submit" expand="full" color="primary">Login</ion-button>
        </form>
        <p text-center>Don't have a account?</p>
        <ion-button expand="full" color="secondary" (click)="registerModal()">Register</ion-button>
      </ion-content>
    </ion-app>
  `,
  styles: [`
    ion-img {
      width: 100px;
      margin: 0 auto;
    }
  `]
})
export class LoginComponent implements OnInit {
  /**
   * Creates an instance of login component.
   * @param modalController
   */
  constructor(
    private store: Store,
    private modalController: ModalController) { }

  ngOnInit(): void {
  }
  /**
   * Dismiss login
   */
  dismissLogin(): void {

  }
  /**
   * Logins login component
   * @param form
   */
  login(form: any): void {
    // TODO: validations for stronger password and email.
    this.store.dispatch(new LoginAction(form.value));
  }
  /**
   * Registers modal
   * @returns
   */
  async registerModal() {
    const registerModal = await this.modalController.create({
      component: RegisterComponent
    });
    return await registerModal.present();
  }

}
