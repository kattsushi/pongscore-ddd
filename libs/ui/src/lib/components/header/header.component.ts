import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
/**
 * Component
 */
@Component({
  selector: 'pongscore-header',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-menu-button slot="start"></ion-menu-button>
        <ng-content></ng-content>
        <ion-buttons *ngIf="logged" slot="end">
          <ion-button color="dark" (click)="doLogout.emit()">
            <ion-icon slot="icon-only" name="log-out-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  /**
   * Input  of header component
   */
  @Input() logged = false;
  /**
   * Output  of header component
   */
  @Output() doLogout: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
