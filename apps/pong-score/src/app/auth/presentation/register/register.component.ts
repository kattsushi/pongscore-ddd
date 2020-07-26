import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Store, ofActionSuccessful, Actions } from '@ngxs/store';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CreateUserDto } from '@pongscore/api-interfaces';

import { Validators as CustomValidators } from '../../application/validators';
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
          <form
            #form="ngForm"
            [formGroup]="registerForm"
            (ngSubmit)="register(form)"
            method="post"
          >
            <ion-item>
              <ion-label position="floating">{{ 'AUTH.REGISTER.FIRST-NAME' | translate }}</ion-label>
              <ion-input
                name="first_name"
                formControlName="first_name"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">{{ 'AUTH.REGISTER.LAST-NAME' | translate }}</ion-label>
              <ion-input
                name="last_name"
                formControlName="last_name"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">{{ 'AUTH.REGISTER.EMAIL' | translate }}</ion-label>
              <ion-input
                type="email"
                name="email"
                formControlName="email"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">{{ 'AUTH.REGISTER.PASSWORD' | translate }}</ion-label>
              <ion-input
                type="password"
                name="password"
                formControlName="password"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">{{ 'AUTH.REGISTER.CONFIRM-PASSWORD' | translate }}</ion-label>
              <ion-input
                type="password"
                name="confirm_password"
                formControlName="confirm_password"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label slot="end">{{ 'AUTH.REGISTER.ACCEPT-TERMS' | translate }}</ion-label>
              <ion-checkbox
                slot="start"
                [formControl]="conditions"
              ></ion-checkbox>
            </ion-item>
            <ion-button type="submit" expand="full" color="secondary"
              >{{ 'AUTH.REGISTER.REGISTER' | translate }}</ion-button
            >
          </form>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col size="12">
          <div class="login">
            <p text-center>{{ 'AUTH.LOGIN.DONT-HAVE-A-ACCOUNT' | translate }}</p>
            <ion-button expand="full" color="primary" (click)="goToLogin.emit()"
              >{{ 'AUTH.LOGIN.LOGIN' | translate }}</ion-button
            >
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styles: [
    `
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
    `,
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  conditions!: FormControl;
  @Output() goToLogin: EventEmitter<string> = new EventEmitter();
  /**
   * Creates an instance of register component.
   * @param modalController
   */
  constructor(
    private actions: Actions,
    private store: Store,
    private modalController: ModalController,
    private toastConstroller: ToastController,
    private formBuilder: FormBuilder
  ) {}
  /**
   * on init
   */
  ngOnInit(): void {
    this.conditions = this.formBuilder.control(false, [Validators.required]);
    this.registerForm = this.formBuilder.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([
            // 1. Password Field is Required
            Validators.required,
            // 2. check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            // 3. check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // 4. check whether the entered password has a lower-case letter
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),

            // 6. Has a minimum length of 8 characters
            Validators.minLength(8),
          ]),
        ],
        confirm_password: ['', Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );

    this.actions.pipe(ofActionSuccessful(RegisterAction)).subscribe(() => {
      this.registerForm.reset();
      this.goToLogin.emit();
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
  async register(form: { value: CreateUserDto }) {
    if (this.conditions.value) {
      if (this.registerForm.valid) {
        this.store.dispatch(new RegisterAction(form.value));
      } else {
        const toast = await this.toastConstroller.create({
          color: 'warning',
          message: 'Please fill required fields',
          duration: 2000,
        });
        toast.present();
      }
    } else {
      const toast = await this.toastConstroller.create({
        color: 'warning',
        message: 'Please Accept the Terms',
        duration: 2000,
      });
      toast.present();
    }
  }
}
