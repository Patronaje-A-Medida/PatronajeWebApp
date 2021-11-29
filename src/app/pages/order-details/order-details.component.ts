import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {ClientService} from '../../services/client.service';
import {AtelierService} from '../../services/atelier.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private clientService: ClientService,
              private atelierService: AtelierService) {
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
      this.atelierService.getAtelierById(order.atelierId).subscribe(atelier => this.order.attendedBy = atelier);
      this.clientService.getClientById(order.clientId).subscribe(client => this.order.client = client);
    });
  }

}
