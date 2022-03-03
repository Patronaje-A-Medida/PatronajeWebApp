import { CustomGarmentRead } from '../garments/custom-garment-read';
import { UserClientMin } from '../users/user-client-min';

export interface OrderDetailRead {
  codeOrder: number;
  orderDetailStatus: string;
  attendedBy: string;
  orderDate: Date;
  garment: CustomGarmentRead;
  client: UserClientMin;
}
