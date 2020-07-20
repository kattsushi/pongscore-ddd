import { Component, OnInit, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SettingsComponent } from '@pongscore/ui';
import { Store } from '@ngxs/store';
import { LogoutAction } from '../auth/application/store/auth.actions';
/**
 * Dashboard Component
 *
 * @export
 * @class DashboardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'pongscore-dashboard',
  template: `
    <ion-app>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="primary">
            <ion-button (click)="presentPopover($event)">
              <ion-icon slot="icon-only" ios="ellipsis-horizontal" md="ellipsis-vertical"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-title>Dashboard</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        dashsboards works
      </ion-content>
  `,
  styles: [`
    p {
      color: red;
    }
  `]
})
export class DashboardComponent implements OnInit {
  /**
   * Creates an instance of dashboard component.
   * @param popoverController
   * @param store
   */
  constructor(
    public popoverController: PopoverController,
    private store: Store
  ) { }

  ngOnInit(): void {
  }
  /**
   * Presents popover
   * @param ev
   */
  async presentPopover(ev: any) {
    const myEmitter: EventEmitter<string> = new EventEmitter<string>();
    myEmitter.subscribe(
      (v: string) => console.log(`my emitter fired and returned a value of ${v}`)
    );
    const popover = await this.popoverController.create({
      component: SettingsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        darkmode: false
      },
    });
    await popover.present();

    popover.onDidDismiss<any>().then(data => {
      console.log('entra aqui', data);
      if (data && data.data === 'logout') {
        this.store.dispatch(LogoutAction);
        // trigger here the method dependind on the popover response
      } else if (data && data.data === 'darkmode') {

      }
    });
  }
}
