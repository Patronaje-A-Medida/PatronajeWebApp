import { FeatureGarmentWrite } from './feature-garment-write';
import { GarmentImageFile } from './garment-image-file';

export interface GarmentWrite {
  codeGarment: string;
  nameGarment: string;
  description: string;
  firstRangePrice: number;
  secondRangePrice: number;
  category: number;
  available: boolean;
  atelierId: number;
  features: FeatureGarmentWrite[];
  images: GarmentImageFile[];
  patterns: GarmentImageFile[];
}
