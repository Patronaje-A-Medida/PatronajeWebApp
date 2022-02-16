export interface OrderQuery {
  atelierId: number;
  orderStatus?: string;
  codeGarment?: string;
  pageNumber?: number;
  pageSize?: number;
}
