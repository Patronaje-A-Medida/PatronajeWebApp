import {Injectable} from '@angular/core';
import {OrderItem} from '../models/order-item';
import {OrderState} from '../models/order-state';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

interface OrdersPagedList {
  items: OrderItem[];
  total: number;
  pageNumber: number;
  itemsPerPage: number;
}

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

}
