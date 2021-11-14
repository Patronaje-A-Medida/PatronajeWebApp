import {Component, Input} from '@angular/core';
import {OrderState} from '../../models/order-state';

@Component({
  selector: 'app-state-chip',
  templateUrl: './state-chip.component.html',
  styleUrls: ['./state-chip.component.scss']
})
export class StateChipComponent {

  @Input() state = OrderState.Attended;

}
