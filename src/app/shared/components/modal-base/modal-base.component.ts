import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {

  private _showModal: boolean = false;

  @Input('messageModal') message: string;
  @Input('additionalMessageModal') additionalMessage: string;
  @Input('typeModal') type: string;

  
  @Input() get showModal(): boolean {
    return this._showModal;
  }
  set showModal(value: boolean) {
    this._showModal = value;
    this.showModalChange.emit(this._showModal);
  }

  @Output() showModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('onCancel') cancelAction = new EventEmitter<void>();
  @Output('onAccept') acceptAction = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  cancelModal(): void {
    this.cancelAction.emit();
    this.showModal = false;
  }
  
  acceptModal(): void {
    this.acceptAction.emit();
    this.showModal = false;
  }

}
