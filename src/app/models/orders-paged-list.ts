import {OrderItem} from './order-item';

export interface OrdersPagedList {
  items: OrderItem[];
  total: number;
  pageNumber: number;
  itemsPerPage: number;
}
