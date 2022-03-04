import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary-outlined',
  templateUrl: './button-primary-outlined.component.html',
  styleUrls: ['./button-primary-outlined.component.scss']
})
export class ButtonPrimaryOutlinedComponent implements OnInit {

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
