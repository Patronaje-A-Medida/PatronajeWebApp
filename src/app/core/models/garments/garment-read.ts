export interface GarmentRead {
  id: number;
  codeGarment: string;
  nameGarment: string;
  description: string;
  firstRangePrice: number;
  secondRangePrice: number;
  available: boolean;
  categoryId: number;
  category: string;
  colors: string[];
  fabrics: string[];
  occasions: string[];
  images: string[];
  patterns: string[];
}
