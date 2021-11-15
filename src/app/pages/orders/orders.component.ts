import {Component, OnInit} from '@angular/core';
import {OrderItem} from '../../models/order-item';
import {OrderService} from '../../services/order.service';
import {OrderState} from '../../models/order-state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: OrderItem[] = [];

  search = '';
  state = OrderState.Attended;

  page = 0;
  itemsPerPage = 4;

  firstItem = 0;
  lastItem = 0;
  totalItems = 0;

  constructor(private orderService: OrderService, private router: Router) { }

  goToDetails(order: OrderItem): void {
    this.router.navigate([`/orders/${order.code}`]).then(() => {});
  }

  ngOnInit(): void {
    this.getOrders();
  }

  onSearchChange(): void {
    this.page = 0;
    this.getOrders();
  }

  onStateChange(): void {
    this.page = 0;
    this.getOrders();
  }

  getNextPage(): void {
    if (this.hasNext()) {
      this.page += 1;
      this.getOrders();
    }
  }

  getPrevPage(): void {
    if (this.hasPrev()) {
      this.page -= 1;
      this.getOrders();
    }
  }

  hasNext = () => (this.page + 1) * this.itemsPerPage < this.totalItems;
  hasPrev = () => this.page > 0;

  private getOrders(): void {
    const result = this.orderService.getAll(this.search, this.state, this.page, this.itemsPerPage);

    this.orders = result.orders;

    this.firstItem = result.startIndex;
    this.lastItem = result.endIndex;
    this.totalItems = result.total;
  }

}
