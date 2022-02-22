import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tooltip-icon',
  templateUrl: './tooltip-icon.component.html',
  styleUrls: ['./tooltip-icon.component.scss']
})
export class TooltipIconComponent implements OnInit {

  @Input('icon') icon: string;
  @Input('description') description: string = '';
  @Input('position') position: string = 'bottom';
  @Output('onClick') clickAction = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  get tooltipIcon() {
    return `${this.icon} tooltip-icon`;
  }

  get tooltipPosition(): string {
    return `tooltip-content tooltip-${this.position}`;
  }

  onClick(): void {
    this.clickAction.emit();
  }

}
