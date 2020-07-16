import { Component, OnInit, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SettingsComponent } from '@pongscore/ui';
import { Store } from '@ngxs/store';
import { Logout } from '../auth/application/store/auth.actions';
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

  constructor(
    public popoverController: PopoverController,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  async presentPopover(ev: any) {
    const myEmitter: any = new EventEmitter< any >();
		myEmitter.subscribe(
			v=> console.log( `my emitter fired and returned a value of ${v}`)
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

    await popover.onDidDismiss().then(
      (data: any) => {
        console.log('entra aqui', data);
        if (data && data.data === 'logout') {
          this.store.dispatch(Logout);
          // trigger here the method dependind on the popover response
        } else if (data && data.data === 'darkmode') {

        }
      });
  }
}
