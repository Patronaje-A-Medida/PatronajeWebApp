import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  isOpen:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ShowMenu() {
    this.isOpen = true;
  }

  HideMenu() {
    this.isOpen = false;
  }
}
