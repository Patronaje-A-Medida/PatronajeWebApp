import { UserClientMin } from "../users/user-client-min";
import { OrderDetailMin } from "./order-detail-min";

export interface OrderRead {
  id: number;
  codeOrder: string;
  price: number;
  orderDate: Date;
  orderStatus: string;
  attendedBy: string;
  details: OrderDetailMin[];
  client: UserClientMin;
  showDetails: boolean;
}
