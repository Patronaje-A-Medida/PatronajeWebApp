export interface OrderQuery {
  atelierId: number;
  orderStatus?: number;
  filterString?: string;
  pageNumber?: number;
  pageSize?: number;
}
