import { GarmentUpdateFile } from './garment-update-file';

export interface GarmentUpdateImages {
  codeGarment: string;
  atelierId: number;
  images: GarmentUpdateFile[];
}
