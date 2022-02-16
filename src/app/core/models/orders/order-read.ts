import { OrderDetailMin } from "./order-detail-min";

export interface OrderRead {
  id: number;
  codeOrder: string;
  price: number;
  orderDate: Date;
  clientId: number;
  orderStatus: string;
  details: OrderDetailMin[];
  showDetails: boolean;
}
