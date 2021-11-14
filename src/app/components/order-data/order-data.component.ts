import {Component, Input} from '@angular/core';
import {Order} from '../../models/order';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent {

  @Input() order: Order = undefined;

}
