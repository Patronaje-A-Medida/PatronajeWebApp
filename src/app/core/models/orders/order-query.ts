export interface OrderQuery {
  atelierId: number;
  orderStatus?: string;
  filterString?: string;
  pageNumber?: number;
  pageSize?: number;
}
