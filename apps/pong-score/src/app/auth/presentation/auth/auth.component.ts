import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MediaMatcher, BreakpointObserver } from '@angular/cdk/layout';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
/**
 *
 *
 * @export
 * @class AuthComponent
 * @implements {OnInit}
 * @implements {AfterContentInit}
 */
@Component({
  selector: 'pongscore-auth',
  template: `
    <pongscore-header></pongscore-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <pongscore-logo></pongscore-logo>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size-lg="6" size-md="6" size-sm="6" size="12">
            <ion-slides pager="false" [options]="slideOpts">
              <ion-slide>
                <pongscore-login (goToRegister)="goToRegisterPage()" (goToForgotPassword)="goToForgotPasswordPage()"></pongscore-login>
              </ion-slide>
              <ion-slide>
                <pongscore-register (goToLogin)="goToLoginPage()"></pongscore-register>
              </ion-slide>
              <ion-slide>
                <pongscore-forgot-password (goToLogin)="goToLoginPage()"></pongscore-forgot-password>
              </ion-slide>
            </ion-slides>
          </ion-col>
          <ion-col class="register-form" size-lg="6" size-md="6" size-sm="6" size="12">
            <pongscore-register></pongscore-register>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [`
    .width-100 {
      width: 100px;
    }

    ion-grid {
      height: 100%;
      margin-top: 56px;
    }

    @media (max-width: 576px) {
      .register-form {
        display: none;
      }
      pongscore-logo {
        display: none;
      }
    }
    @media (min-width: 1000px) {
      ion-col {
        padding-left: 50px;
        padding-right: 50px;
      }
    }
    @media (min-width: 1500px) {
      ion-col {
        padding-left: 210px;
        padding-right: 210px;
      }
    }
  `]
})
export class AuthComponent implements OnInit, AfterContentInit {
  /**
   * Matcher  of auth component
   */
  matcher!: MediaQueryList;
  /**
   * Slides  of auth component
   */
  slides: HTMLIonSlidesElement | null | undefined;
  /**
   * Slide opts of auth component
   */
  slideOpts: any = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: true
  };
  /**
   * Creates an instance of auth component.
   * @param mediaMatcher
   * @param breakpointObserver
   */
  constructor(
    public mediaMatcher: MediaMatcher,
    public breakpointObserver: BreakpointObserver,
    private modalController: ModalController
  ) { }
  /**
   * on init
   */
  ngOnInit(): void {
    this.matcher = this.mediaMatcher.matchMedia('(min-width: 576px)');
    this.matcher.addEventListener('change', this.breakPointListener.bind(this));
  }
  /**
   * after content init
   */
  ngAfterContentInit() {
    this.slides = document.querySelector('ion-slides');
    this.slides?.lockSwipes(this.breakpointObserver.isMatched('(min-width: 576px)'));
  }
  /**
   * Breaks point listener
   * @param event
   */
  breakPointListener(event: any) {
    if (this.slides) {
      this.slides.slideTo(0);
      this.slides.lockSwipes(event.matches);
    }
  }
  /**
   * Go to login page
   */
  async goToLoginPage() {
    this.slides?.slideTo(0);
    const isModalOpened = await this.modalController.getTop();
    if (isModalOpened) {
      this.modalController.dismiss();
    }
  }
  /**
   * Go to register page
   */
  goToRegisterPage() {
    this.slides?.slideTo(1);
  }
  /**
   * Go to forgot password page
   * @returns
   */
  async goToForgotPasswordPage() {
    if (this.breakpointObserver.isMatched('(min-width: 576px)')) {
      const registerModal = await this.modalController.create({
        component: ModalComponent
      });
      return await registerModal.present();
    } else {
      this.slides?.slideTo(2);
    }
  }
}
