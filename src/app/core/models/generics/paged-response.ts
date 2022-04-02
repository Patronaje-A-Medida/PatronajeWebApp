export interface PagedResponse<T> {
  items: T[];
  total: number;
  maxPage: number;
  pageNumber: number;
  itemsPerPage: number;
}
