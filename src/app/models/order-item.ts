import { OrderClient } from './order-client';
import { OrderState } from './order-state';

export interface OrderItem {
  garmentCode: string;
  client: OrderClient;
  code: string;
  price: string;
  date: Date;
  state: OrderState;
}
