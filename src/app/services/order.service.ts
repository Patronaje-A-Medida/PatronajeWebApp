import { Injectable } from '@angular/core';
import { OrderItem } from '../models/order-item';
import { OrderState } from '../models/order-state';

interface OrdersResponse {
  orders: OrderItem[];
  total: number;
  startIndex: number;
  endIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: OrderItem[] = Array(20).fill({}).map(() => ({
      garmentCode: `PR001${Math.random()}`,
      client: { name: 'Silvana Camero', email: 'scamero@mail.com', phone: '123456789' },
      code: 'ORD00001',
      price: 'S/. 230.00',
      date: new Date(2021, 9, 6),
      state: OrderState.Active,
  }));

  constructor() { }

  public getAllFromPage(page: number, itemsPerPage: number): OrdersResponse {
    const firstItem = this.getFirstItem(page, itemsPerPage);
    const lastItem = this.getLastItem(firstItem, itemsPerPage, this.orders.length);

    return {
      orders: this.orders.slice(firstItem - 1, lastItem),
      total: this.orders.length,
      startIndex: firstItem,
      endIndex: lastItem,
    };
  }

  private getFirstItem = (page: number, itemsPerPage: number): number => page * itemsPerPage + 1;

  private getLastItem = (firstItem: number, itemsPerPage: number, totalItems: number): number =>
    firstItem - 1 + itemsPerPage > totalItems - 1 ? totalItems : firstItem - 1 + itemsPerPage

}
