import {Component, OnInit} from '@angular/core';
import {OrderItem} from '../../models/order-item';
import {OrderService} from '../../services/order.service';
import {OrderState} from '../../models/order-state';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  private clientsRequestUnsubscribeSignal: Subject<void>;
  private ordersRequest;

  orders: OrderItem[] = [];

  search = '';
  state = OrderState.Attended;

  page = 0;
  itemsPerPage = 4;

  firstItem = 0;
  lastItem = 0;
  totalItems = 0;

  isLoading = false;

  constructor(private orderService: OrderService, private clientService: ClientService, private router: Router) { }

  goToDetails(order: OrderItem): void {
    this.router.navigate([`/orders/${order.id}`]).then(() => {});
  }

  ngOnInit(): void {
    this.getOrders().then(() => {});
  }

  onSearchChange(): void {
    this.page = 0;
    this.getOrders().then(() => {});
  }

  onStateChange(): void {
    this.page = 0;
    this.getOrders().then(() => {});
  }

  getNextPage(): void {
    if (this.hasNext()) {
      this.page += 1;
      this.getOrders().then(() => {});
    }
  }

  getPrevPage(): void {
    if (this.hasPrev()) {
      this.page -= 1;
      this.getOrders().then(() => {});
    }
  }

  hasNext = () => (this.page + 1) * this.itemsPerPage < this.totalItems;
  hasPrev = () => this.page > 0;

  private async getOrders(): Promise<void> {
    await this.cancelOrdersRequest();
    this.isLoading = true;

    this.ordersRequest = this.orderService.getAll(this.search, this.state, this.page, this.itemsPerPage)
      .subscribe(result => {
        this.orders = result.items;
        this.totalItems = result.total;
        this.firstItem = this.getFirstItem(result.pageNumber, result.itemsPerPage);
        this.lastItem = this.getLastItem(this.firstItem, result.itemsPerPage, result.total);

        this.getClientsData();

        this.isLoading = false;
      });
  }

  private async getClientsData(): Promise<void> {
    await this.cancelClientsRequest();
    this.clientsRequestUnsubscribeSignal = new Subject();

    this.orders.forEach(order => this.clientService
      .getClientById(order.clientId)
      .pipe(takeUntil(this.clientsRequestUnsubscribeSignal.asObservable()))
      .subscribe(client => order.client = client));
  }

  private getFirstItem = (page: number, itemsPerPage: number): number => (page - 1) * itemsPerPage + 1;

  private getLastItem = (firstItem: number, itemsPerPage: number, totalItems: number): number =>
    firstItem - 1 + itemsPerPage > totalItems - 1 ? totalItems : firstItem - 1 + itemsPerPage

  private async cancelOrdersRequest(): Promise<void> {
    if (this.ordersRequest) {
      this.ordersRequest.unsubscribe();
      this.isLoading = false;
    }
  }

  private async cancelClientsRequest(): Promise<void> {
    if (this.clientsRequestUnsubscribeSignal) {
      this.clientsRequestUnsubscribeSignal.next();
      this.clientsRequestUnsubscribeSignal.unsubscribe();
    }
  }

}
