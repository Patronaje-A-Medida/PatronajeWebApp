import {Component, OnInit} from '@angular/core';
import {OrderItem} from '../../models/order-item';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: OrderItem[] = [];

  search = '';

  page = 0;
  itemsPerPage = 4;

  firstItem = 0;
  lastItem = 0;
  totalItems = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  onSearchChange = (): void => {
    this.page = 0;
    this.getOrders(this.search);
  }

  getNextPage(): void {
    if (this.hasNext()) {
      this.page += 1;
      this.getOrders(this.search);
    }
  }

  getPrevPage(): void {
    if (this.hasPrev()) {
      this.page -= 1;
      this.getOrders(this.search);
    }
  }

  hasNext = () => (this.page + 1) * this.itemsPerPage < this.totalItems;
  hasPrev = () => this.page > 0;

  private getOrders(search?: string): void {
    const result = this.orderService.getAll(search, this.page, this.itemsPerPage);

    this.orders = result.orders;

    this.firstItem = result.startIndex;
    this.lastItem = result.endIndex;
    this.totalItems = result.total;
  }

}
