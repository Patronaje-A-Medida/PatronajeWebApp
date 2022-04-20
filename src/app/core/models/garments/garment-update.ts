import { FeatureGarmentUpdate } from './feature-garment-update';
import { GarmentImageFile } from './garment-image-file';

export interface GarmentUpdate {
  codeGarment: string;
  nameGarment: string;
  description: string;
  firstRangePrice: number;
  secondRangePrice: number;
  category: number;
  available: boolean;
  atelierId: number;
  features: FeatureGarmentUpdate[];
  images: GarmentImageFile[];
  patterns: GarmentImageFile[];
}
