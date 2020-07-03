import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pongscore-dashboard',
  template: `
    <p>dashboard works!</p>
  `,
  styles: [`
    p {
      color: red;
    }
  `]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
