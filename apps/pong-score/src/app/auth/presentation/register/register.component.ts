import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateUserDTO } from '@pongscore/api-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validators as CustomValidators } from '../../application/validators';
import { Store } from '@ngxs/store';
import { RegisterAction } from '../../application/store/auth.actions';

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
          <form #form="ngForm" [formGroup]="registerForm" (ngSubmit)="register(form)" method="post">
            <ion-item>
              <ion-label position="floating">First Name</ion-label>
              <ion-input ngModel name="first_name" formControlName="first_name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Last Name</ion-label>
              <ion-input ngModel name="last_name" formControlName="last_name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" ngModel name="email" formControlName="email"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" ngModel name="password" formControlName="password"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Confirm Password</ion-label>
              <ion-input type="password" ngModel name="confirm_password" formControlName="confirm_password"></ion-input>
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
  registerForm!: FormGroup;
  @Output() goToLogin: EventEmitter<string> = new EventEmitter();
  /**
   * Creates an instance of register component.
   * @param modalController
   */
  constructor(
    private store: Store,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }
  /**
   * on init
   */
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),

        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)])
      ],
      confirm_password: ['', Validators.compose([Validators.required])]
    }, {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
    });
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
  async register(form: { value: CreateUserDTO }) {
    if (this.registerForm.valid) {
      await this.store.dispatch(new RegisterAction(form.value));
      this.registerForm.reset();
      this.goToLogin.emit();
      console.log('form', this.registerForm.value);
    }
  }
}
