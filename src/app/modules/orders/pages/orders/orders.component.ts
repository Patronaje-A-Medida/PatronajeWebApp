import { Component, OnInit } from '@angular/core';
import { PagedResponse } from 'src/app/core/models/generics/paged-response';
import { OrderDetailMin } from 'src/app/core/models/orders/order-detail-min';
import { OrderQuery } from 'src/app/core/models/orders/order-query';
import { OrderRead } from 'src/app/core/models/orders/order-read';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: PagedResponse<OrderRead>;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(
    private orderService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders() {
    let query: OrderQuery = {
      atelierId: 0,
      pageNumber: 1,
      pageSize: 10
    };

    this.orderService.getAllByQuery(this.pageNumber, this.pageSize).subscribe(
      (res) => this.orders = res
    );

  }

  showDetails(order: OrderRead) {
    order.showDetails = !order.showDetails;
    console.log(order);
  }

  garmentColor(color: string) {
    return `background-color: ${color};`;
  }

}
