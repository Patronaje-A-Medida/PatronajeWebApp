export interface GarmentQuery {
  atelierId: number;
  categories: number[];
  occasions: number[];
  filterString?: string;
  category?: number;
  pageNumber?: number;
  pageSize?: number;
}
