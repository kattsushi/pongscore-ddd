import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validators as CustomValidators } from '../../application/validators';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordAction } from '../../application/store/auth.actions';
import { ResetPasswordDto } from '@pongscore/api-interfaces';

/**
 * Login Component
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pongscore-reset-password',
  template: `
    <pongscore-header></pongscore-header>
    <ion-content>
      <ion-grid class="container">
        <ion-row>
          <ion-col size="12">
            <pongscore-logo></pongscore-logo>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <form
              #form="ngForm"
              [formGroup]="resetPasswordForm"
              (ngSubmit)="resetPassword()"
              method="post"
            >
              <ion-item>
                <ion-label position="floating">Current Password</ion-label>
                <ion-input
                  type="password"
                  name="currentPassword"
                  formControlName="currentPassword"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input
                  type="password"
                  name="password"
                  formControlName="newPassword"
                ></ion-input>
              </ion-item>
              <ion-button type="submit" expand="full" color="primary"
                >Change Password</ion-button
              >
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      .container {
        padding-left: 100px;
        padding-right: 100px;
      }
      ion-img {
        width: 100px;
        margin: 0 auto;
      }
      :host {
        width: 100%;
        /* max-width: 500px; */
      }
    `,
  ],
})
export class ResetPasswordComponent implements OnInit {
  /**
   * Login form of login component
   */
  resetPasswordForm!: FormGroup;
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
    private store: Store,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  /**
   * on init
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.resetPasswordForm = this.formBuilder.group({
        email: [params.email, Validators.required],
        newPasswordToken: [params.passwordToken, Validators.required],
        currentPassword: [
          '',
          // Validators.compose([
          //   // 1. Password Field is Required
          //   Validators.required,
          //   // 2. check whether the entered password has a number
          //   CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          //   // 3. check whether the entered password has upper case letter
          //   CustomValidators.patternValidator(/[A-Z]/, {
          //     hasCapitalCase: true,
          //   }),
          //   // 4. check whether the entered password has a lower-case letter
          //   CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),

          //   // 6. Has a minimum length of 8 characters
          //   Validators.minLength(8),
          // ]),
        ],
        newPassword: [
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
      });
    });
  }
  /**
   * Change Password
   */
  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.store.dispatch(
        new ResetPasswordAction(this.resetPasswordForm.value)
      );
    }
  }
}
