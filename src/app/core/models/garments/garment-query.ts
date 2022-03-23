export interface GarmentQuery {
  atelierId: number;
  categories: number[];
  occasions: number[];
  availabilities: boolean[];
  filterString?: string;
  pageNumber?: number;
  pageSize?: number;
}
