import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary-filled',
  templateUrl: './button-primary-filled.component.html',
  styleUrls: ['./button-primary-filled.component.scss']
})
export class ButtonPrimaryFilledComponent implements OnInit {

  @Input('text') textBtn: string;
  @Input('icon') iconBtn: string;
  @Input('disabled') isDisabled: boolean = false;
  
  @Output('onClick') clickAction = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clickAction.emit();
  }
}
