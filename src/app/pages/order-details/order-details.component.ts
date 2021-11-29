import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {ClientDetails} from '../../models/client-details';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;
  client: ClientDetails;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = parseInt(params.get('id'), 10);
      this.getOrder(orderId);
    });
  }

  private getOrder(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe(order => {
      this.order = order;
      this.clientService.getClientById(order.clientId).subscribe(client => this.client = client);
    });
  }

}
