import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {

  @Output() menuClick = new EventEmitter<void>();

  @Input() username = '';

  menuClickHandler = (): void => this.menuClick.emit();

}
