import {OrderState} from './order-state';
import {ClientDetails} from './client-details';

export interface OrderItem {
  garmentCode: string;
  clientId: number;
  client?: ClientDetails;
  code: string;
  price: string;
  date: string;
  state: OrderState;
}
