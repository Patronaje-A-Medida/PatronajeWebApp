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

  private orders: OrderItem[] = Array(19).fill({}).map(() => ({
      garmentCode: `PR001${Math.random()}`,
      client: { name: 'Silvana Camero', email: 'scamero@mail.com', phone: '123456789' },
      code: 'ORD00001',
      price: 'S/. 230.00',
      date: new Date(2021, Math.random() * (11), Math.random() * (18 - 1) + 1),
      state: OrderState.Attended,
  }));

  constructor() { }

  public getAll(search?: string, state?: OrderState, page: number = 0, itemsPerPage: number = this.orders.length)
    : OrdersResponse {
    const firstItem = this.getFirstItem(page, itemsPerPage);
    const lastItem = this.getLastItem(firstItem, itemsPerPage, this.orders.length);

    const allItems = this.getOrdersSortedByDate(this.orders)
      .filter(order => search ? order.garmentCode.includes(search) : true)
      .filter(order => state ? order.state === state : true);

    return {
      orders: allItems.slice(firstItem - 1, lastItem),
      total: allItems.length,
      startIndex: firstItem,
      endIndex: lastItem,
    };
  }

  private getOrdersSortedByDate = (orders: OrderItem[]) =>
    orders.sort((a, b) => a.date.getTime() - b.date.getTime())

  private getFirstItem = (page: number, itemsPerPage: number): number => page * itemsPerPage + 1;

  private getLastItem = (firstItem: number, itemsPerPage: number, totalItems: number): number =>
    firstItem - 1 + itemsPerPage > totalItems - 1 ? totalItems : firstItem - 1 + itemsPerPage

}
