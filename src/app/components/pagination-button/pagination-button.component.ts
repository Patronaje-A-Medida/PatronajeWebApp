import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.scss']
})
export class PaginationButtonComponent {

  @Input() disabled = false;
  @Input() direction: 'left' | 'right' = 'left';

  @Output() arrowClick = new EventEmitter<void>();

  arrowClickHandler = (): void => this.arrowClick.emit();

}
