import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  isOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showOrHideSideBar() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('window:resize', ['$event'])
  onWindowsResize($event: any): void {
    const windowWidth: number = $event.target.innerWidth;
    if(windowWidth >= 768) {
      this.isOpen = true;
    }
  }
}
