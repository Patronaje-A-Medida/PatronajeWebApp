import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss']
})
export class ButtonActionComponent implements OnInit {

  @Input('text') public text: string;
  @Output('onClick') public clickAction = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickAction.emit();
  }

}
