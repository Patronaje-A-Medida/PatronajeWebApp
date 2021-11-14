import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {OrderState} from '../../models/order-state';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: Order = {
    code: 'ORD0001',
    eventType: 'Oficina',
    date: new Date(2021, 9, 10),
    garmentCode: 'PR001',
    fabricType: 'Franela',
    attendedBy: 'Anahí Durand',
    garmentName: 'Saco Invierno 2021',
    selectedColor: '#343351',
    state: OrderState.Attended,
    price: 'S/. 230.00',
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
