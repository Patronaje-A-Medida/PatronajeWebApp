import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PagedResponse } from '../models/generics/paged-response';
import { OrderDetailRead } from '../models/orders/order-detail-read';
import { OrderQuery } from '../models/orders/order-query';
import { OrderRead } from '../models/orders/order-read';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly GESTION_API = environment.apiGestionUrl;
  private readonly uriOrders: string = this.GESTION_API + '/orders';

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) { }

  getAllByQuery(
    pageNumber: number = 1, 
    pageSize: number = 10,
    filterString?: string,
    orderStatus?: string,
  ): Observable<PagedResponse<OrderRead>> {
    const query: OrderQuery = {
      atelierId: 1,
      //atelierId: this.userDataService.atelierId,
      orderStatus: orderStatus,
      filterString: filterString,
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

  getDetail(codeOrder: string, codeGarment: string): Observable<OrderDetailRead> {
    const params = new HttpParams()
      .set('codeOrder', codeOrder)
      .set('codeGarment', codeGarment);

    return this.http.get<OrderDetailRead>(`${this.uriOrders}/details`, { params: params });
  }
}
