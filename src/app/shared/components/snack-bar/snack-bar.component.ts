import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {

  private _showSnack: boolean = false;

  @Input() message: string = '';

  @Input() type: string = '';

  @Input() get showSnack(): boolean {
    return this._showSnack;
  }
  set showSnack(value: boolean) {
    this._showSnack = value;
    this.showSnackChange.emit(this._showSnack);
    if (this._showSnack) this.autoClose();
  }

  @Output() showSnackChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  hide() {
    this.showSnackChange.emit(false);
  }

  autoClose() {
    setTimeout((_) => this.hide(), 3500);
  }
}
