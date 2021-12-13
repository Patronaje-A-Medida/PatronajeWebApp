import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public isOpen: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  showMenu() {
    this.isOpen = true;
  }

  hideMenu() {
    this.isOpen = false;
  }

  navigateTo(target: string, path: string = '../'): void {
    this.router.navigate([path + target], {relativeTo: this.route});
  }

  hideAndMove(target: string) {
    this.hideMenu();
    this.navigateTo(target);
  }

  scrollTo(target: string) {
    this.hideMenu();
    this.router.navigate(['/home'], { fragment: target });
  }

}
