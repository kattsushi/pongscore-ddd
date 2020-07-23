import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ForgotPasswordAction } from '../../application/store/auth.actions';
/**
 * Component
 */
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
          <form>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input
                [formControl]="emailForm"
                type="email"
                name="email"
              ></ion-input>
            </ion-item>
            <ion-button
              (click)="sendRequest()"
              type="submit"
              expand="full"
              color="primary"
              >Send Request Password</ion-button
            >
          </form>
        </ion-col>
        <ion-col></ion-col>
      </ion-row>
    </ion-grid>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class ForgotPasswordComponent implements OnInit {
  @Output() goToLogin: EventEmitter<string> = new EventEmitter();
  emailForm!: FormControl;
  constructor(private formBuilder: FormBuilder, private store: Store) {}
  /**
   * on init
   */
  ngOnInit(): void {
    this.emailForm = this.formBuilder.control(
      null,
      Validators.compose([Validators.required, Validators.email])
    );
  }
  /**
   * Sends request
   */
  sendRequest() {
    if (this.emailForm.valid) {
      this.store.dispatch(new ForgotPasswordAction(this.emailForm.value));
    }
  }
}
