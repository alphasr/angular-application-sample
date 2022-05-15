import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  isShowing: boolean = false;
  constructor() {}

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  ngOnInit(): void {}
}
