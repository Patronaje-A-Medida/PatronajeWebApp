import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-action-outline',
  templateUrl: './button-action-outline.component.html',
  styleUrls: ['./button-action-outline.component.scss']
})
export class ButtonActionOutlineComponent implements OnInit {

  @Input('text') public text: string;
  @Output('onClick') public clickAction = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickAction.emit();
  }

}
