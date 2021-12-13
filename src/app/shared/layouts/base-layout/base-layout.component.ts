import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {

  public onScroll: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowsScroll($event): void {
    const scrollOffset = $event.srcElement.children[0].scrollTop;
    if (scrollOffset > 50){
      console.log("window scroll: ", scrollOffset);
      this.onScroll = true;
    } else{
      this.onScroll = false;
    }
  }
}
