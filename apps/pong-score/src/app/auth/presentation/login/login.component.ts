import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { LoginAction } from '../../application/store/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validators as CustomValidators } from '../../application/validators';
import { Action } from 'rxjs/internal/scheduler/Action';

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
          <form
            #form="ngForm"
            [formGroup]="loginForm"
            (ngSubmit)="login()"
            method="post"
          >
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input
                type="email"
                name="email"
                formControlName="email"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input
                type="password"
                name="password"
                formControlName="password"
              ></ion-input>
            </ion-item>

            <p text-right (click)="goToForgotPassword.emit()">
              Forgot Password?
            </p>

            <ion-button type="submit" expand="full" color="primary"
              >Login</ion-button
            >
          </form>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col size="12">
          <div class="register">
            <p text-center>Don't have a account?</p>
            <ion-button
              expand="full"
              color="secondary"
              (click)="goToRegister.emit()"
              >Register</ion-button
            >
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styles: [
    `
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
    `,
  ],
})
export class LoginComponent implements OnInit {
  /**
   * Login form of login component
   */
  loginForm!: FormGroup;
  /**
   * Output  of login component
   */
  @Output() goToRegister: EventEmitter<any> = new EventEmitter();
  /**
   * Output  of login component
   */
  @Output() goToForgotPassword: EventEmitter<any> = new EventEmitter();
  /**
   * Creates an instance of login component.
   * @param modalController
   */
  constructor(
    private actions: Actions,
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),

          // 6. Has a minimum length of 8 characters
          Validators.minLength(8),
        ]),
      ],
    });

    this.actions.pipe(ofActionSuccessful(LoginAction)).subscribe(() => {
      this.loginForm.reset();
    });
  }
  /**
   * Logins login component
   */
  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new LoginAction(this.loginForm.value));
    }
  }
}
