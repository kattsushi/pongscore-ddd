import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <pongscore-logo></pongscore-logo>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <form #form="ngForm" (ngSubmit)="login(form)" method="post">
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
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col size="12">
          <div class="register">
            <p text-center>Don't have a account?</p>
            <ion-button expand="full" color="secondary" (click)="goToRegister.emit()">Register</ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styles: [`
    ion-img {
      width: 100px;
      margin: 0 auto;
    }
    :host {
      width: 100%;
      max-width: 500px;
    }
    @media (min-width: 576px) {
      .register {
        display: none;
      }
      pongscore-logo {
        display: none;
      }
    }

  `]
})
export class LoginComponent implements OnInit {

  @Output() goToRegister: EventEmitter<any> = new EventEmitter();
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
