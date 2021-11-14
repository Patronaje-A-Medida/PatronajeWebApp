import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClientDetails} from '../../models/client-details';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent {

  @Input() clientDetails: ClientDetails = undefined;
  @Output() generatePattern = new EventEmitter<void>();

  generatePatternHandler = (): void => this.generatePattern.emit();

}
