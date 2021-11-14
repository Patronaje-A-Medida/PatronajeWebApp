import { OrderState } from './order-state';

export interface Order {
  code: string;
  eventType: string;
  date: Date;
  garmentCode: string;
  fabricType: string;
  attendedBy: string;
  garmentName: string;
  selectedColor: string;
  state: OrderState;
  price: string;
}
