import {OrderState} from './order-state';
import {Feature} from './feature';
import {ClientDetails} from './client-details';
import {Atelier} from './atelier';

export interface Order {
  code: string;
  clientId: number;
  date: string;
  garmentCode: string;
  atelierId: number;
  garmentName: string;
  selectedColor: string;
  state: OrderState;
  price: string;
  features: Feature[];
  client?: ClientDetails;
  attendedBy?: Atelier;
}
