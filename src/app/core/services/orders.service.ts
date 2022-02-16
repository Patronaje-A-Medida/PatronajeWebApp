import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedResponse } from '../models/generics/paged-response';
import { OrderQuery } from '../models/orders/order-query';
import { OrderRead } from '../models/orders/order-read';
import { GESTION_API } from '../utils/apis.constants';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly uriOrders: string = GESTION_API + '/orders';

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) { }

  getAllByQuery(
    pageNumber: number = 1, 
    pageSize: number = 10,
    codeGarment?: string, 
    orderStatus?: string, 
  ): Observable<PagedResponse<OrderRead>> {
    const query: OrderQuery = {
      atelierId: 1, //this.userDataService.atelierId,
      codeGarment: codeGarment,
      orderStatus: orderStatus,
      pageNumber: pageNumber,
      pageSize: pageSize
    };

    return this.http.post<PagedResponse<OrderRead>>(`${this.uriOrders}/by-query`, query).pipe(
      map((res) => {
        res.items.forEach(o => o.showDetails = false);
        return res;
      })
    );
  }
}
