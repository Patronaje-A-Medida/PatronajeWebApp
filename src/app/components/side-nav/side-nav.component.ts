import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  values = ['orders', 'catalog', 'account', 'settings'];

  constructor(private location: Location) {
  }

  get selected(): string {
    return this.values.find(value => this.location.path().includes(value));
  }

}
