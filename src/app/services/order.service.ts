import {Injectable} from '@angular/core';
import {OrderState} from '../models/order-state';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Order} from '../models/order';
import {OrdersPagedList} from '../models/orders-paged-list';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  public getAll(garmentCode?: string, orderStatus?: OrderState, pageNumber?: number, pageSize?: number)
    : Observable<OrdersPagedList> {
    return this.http.post<OrdersPagedList>(`${environment.apiUrl}/orders`, {
      orderStatus,
      garmentCode: garmentCode === '' ? null : garmentCode,
      pageNumber: pageNumber + 1,
      pageSize,
    });
  }

  public getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/orders/${orderId}`);
  }

}
