export interface PagedResponse<T> {
  items: T[];
  total: number;
  pageNumber: number;
  itemsPerPage: number;
}
